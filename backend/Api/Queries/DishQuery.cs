using Api.Models.Response;
using Api.Services;
using Api.Types;
using GraphQL;
using GraphQL.Types;

namespace Api.Queries
{
    public class DishQuery : ObjectGraphType
    {
        public DishQuery(AuthService authService, RecipeService recipeService)
        {
            Field<ListGraphType<RecipeType>>(
                name: "recipes",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "token" }),
                resolve: context =>
                {
                    var token = context.GetArgument<string>("token");                    
                    if (token != "" && authService.tokenValidation(token).Result)
                    {
                        var recipes = recipeService.getRecipes();
                        return recipes;
                    }
                    else
                    {
                        return null;
                    }
                }
            );            
        }
    }
}
