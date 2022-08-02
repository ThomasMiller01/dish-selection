using Api.Models.Response;
using GraphQL;
using GraphQL.Client.Abstractions;
using GraphQL.Types;
using System.Threading.Tasks;

namespace Api.Services
{
    public class AuthService
    {
        private readonly IGraphQLClient client;

        public AuthService(IGraphQLClient client)
        {
            this.client = client;
        }

        public async Task<bool> tokenValidation(string token)
        {
            bool valid = await this.tokenAsync(token);            
            return valid;
        }

        private async Task<bool> tokenAsync(string token)
        {
            string _query = @"query ValidateToken($token: String!) {
                                tokenValidation(token: $token)
                            }";

            var getAuthRequest = new GraphQLRequest()
            {
                Query = _query,
                OperationName = "ValidateToken",
                Variables = new { token = token }
            };
            var response = await this.client.SendQueryAsync<ValidateTokenResponse>(getAuthRequest);            
            return response.Data.tokenValidation;
        }        
    }
}
