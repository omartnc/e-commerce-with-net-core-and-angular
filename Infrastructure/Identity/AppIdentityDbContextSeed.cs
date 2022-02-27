using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        Id = Guid.NewGuid().ToString(),
                        FistName = "Bob",
                        LastName = "Bobbity",
                        State = "100 the st.",
                        City = "Toronto",
                        Street = "GTI",
                        ZipCode = "M4K 2GG"
                    }
                };
                await userManager.CreateAsync(user,"Pa$$w0rd");
            }
        }
    }
}
