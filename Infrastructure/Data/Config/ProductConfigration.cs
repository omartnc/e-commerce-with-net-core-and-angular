﻿using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfigration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p=> p.Id).IsRequired();
            builder.Property(p=> p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p=> p.Description).IsRequired().HasMaxLength(1000);
            builder.Property(p=> p.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(p=>p.ProductBrand).WithMany().HasForeignKey(x=>x.ProductBrandId);
            builder.HasOne(p=>p.ProductType).WithMany().HasForeignKey(x=>x.ProductTypeId);
        }
    }
}
