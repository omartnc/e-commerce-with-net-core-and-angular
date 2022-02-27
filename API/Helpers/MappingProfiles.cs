using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(x => x.ProductType, y => y.MapFrom(x => x.ProductType.Name))
                .ForMember(x => x.ProductBrand, y => y.MapFrom(x => x.ProductBrand.Name))
                .ForMember(x => x.PictureUrl, y => y.MapFrom<ProductUrlResolver>());


            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();


        }
    }
}
