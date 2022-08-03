using Api.Models.Request;
using Api.Services;
using Api.Types.Request;
using Api.Types.Response;
using GraphQL;
using GraphQL.Types;

namespace Api.Queries
{
    public class RecipeQuery : ObjectGraphType
    {
        public RecipeQuery(AuthService authService, RecipeService recipeService)
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
            Field<RecipeType>(
                name: "recipe",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "recipe_id" }, new QueryArgument<StringGraphType> { Name = "token" }),
                resolve: context =>
                {
                    var recipe_id= context.GetArgument<int>("recipe_id");
                    var token = context.GetArgument<string>("token");
                    if (token != "" && authService.tokenValidation(token).Result)
                    {
                        var recipe = recipeService.getRecipeById(recipe_id);
                        return recipe;
                    }
                    else
                    {
                        return null;
                    }
                }
            );
            Field<ListGraphType<RecipeType>>(
                name: "search",
                arguments: new QueryArguments(new QueryArgument<SearchRecipeType>{ Name = "search" }, new QueryArgument<StringGraphType> { Name = "token" }),
                resolve: context =>
                {
                    var search = context.GetArgument<SearchRecipeModel>("search");
                    var token = context.GetArgument<string>("token");                    
                    if (token != "" && authService.tokenValidation(token).Result)
                    {
                        var recipes = recipeService.searchRecipes(search);
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
