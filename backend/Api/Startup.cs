using Api.Schemes;
using Api.Services;
using GraphiQl;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using GraphQL.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api
{
    public class Startup
    {
        public const string graphqlPath = "/graphiql";
        // public const string graphqlApiPath = "/api";
        public const string graphqlApiPath = "";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<GraphQLSchema>();

            services.AddGraphQL(options => {
                options.EnableMetrics = false;
            }).AddSystemTextJson().AddGraphTypes(typeof(GraphQLSchema), ServiceLifetime.Scoped);

            var authClient = new GraphQLHttpClient("https://api.thomasmiller.info/auth", new NewtonsoftJsonSerializer());
            
            services.AddSingleton(new AuthService(authClient));
            services.AddSingleton<RecipeService>();

            services.AddControllers();

            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            services.AddCors();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseGraphQL<GraphQLSchema>();
            app.UseGraphiQl(graphqlPath, graphqlApiPath);

            app.UseCors(
                options => options.SetIsOriginAllowed(_ => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
            );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
