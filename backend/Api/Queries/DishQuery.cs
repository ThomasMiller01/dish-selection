using Api.Services;
using GraphQL;
using GraphQL.Types;

namespace Api.Queries
{
    public class DishQuery : ObjectGraphType
    {
        public DishQuery(AuthService authService)
        {
            Field<StringGraphType>(
                name: "dishes",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "token" }),
                resolve: context =>
                {
                    var token = context.GetArgument<string>("token");                    
                    if (token != "" && authService.tokenValidation(token).Result)
                    {
                        return "you did it sucker";
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
