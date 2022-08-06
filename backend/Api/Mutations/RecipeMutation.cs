using Api.Models.Request;
using Api.Models.Response;
using Api.Services;
using Api.Types;
using Api.Types.Request;
using GraphQL;
using GraphQL.Types;

namespace Api.Mutations
{
    public class RecipeMutation : ObjectGraphType
    {
        public RecipeMutation(AuthService authService, RecipeService recipeService)
        {
            Field<MutationType>(
                name: "addRecipe",
                arguments: new QueryArguments(new QueryArgument<AddRecipeType> { Name = "recipe" }, new QueryArgument<StringGraphType> { Name = "token" }),
                resolve: context =>
                {
                    var recipe = context.GetArgument<AddRecipeModel>("recipe");
                    var token = context.GetArgument<string>("token");
                    if (token != "" && authService.tokenValidation(token).Result)
                    {
                        var value = recipeService.addRecipe(recipe);
                        return new MutationModel { value=value };
                    }
                    else
                    {
                        return null;
                    }
                }
            );

            Field<MutationType>(
                name: "cookRecipe",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "recipe_id" }, new QueryArgument<StringGraphType> { Name = "token" }),
                resolve: context =>
                {
                    var recipe_id = context.GetArgument<int>("recipe_id");
                    var token = context.GetArgument<string>("token");
                    if (token != "" && authService.tokenValidation(token).Result)
                    {
                        var value = recipeService.cookRecipe(recipe_id);
                        return new MutationModel { value = value };
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
