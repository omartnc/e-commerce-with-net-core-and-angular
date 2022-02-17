
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{ 
    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IGenericRepository<Product> _genericRepository; 
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository productRepository, IGenericRepository<Product> genericRepository,IMapper mapper)
        {
            _productRepository = productRepository;
            _genericRepository = genericRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecificication(productParams);
            var totalItems= await _genericRepository.CountAsync(countSpec);
            var products = await _genericRepository.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,productParams.PageSize,totalItems,data));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(Guid id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _genericRepository.GetEntityWithSpec(spec);

            if (product == null)  return NotFound(new ApiResponse(404));


            //var productDto = new ProductToReturnDto
            //{
            //    Id = product.Id,
            //    Description = product.Description,
            //    Name = product.Name,
            //    PictureUrl = product.PictureUrl,
            //    Price = product.Price,
            //    ProductBrand=product.ProductBrand.Name,
            //    ProductType=product.ProductType.Name,
            //};
            return Ok(_mapper.Map<Product,ProductToReturnDto>(product));
            //var product = await _productRepository.GetProductByIdAsync(id);
            //return Ok(product);
        }
    }
}
