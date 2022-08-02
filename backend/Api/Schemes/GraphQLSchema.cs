using Api.Queries;
using Api.Services;
using GraphQL.Client.Abstractions;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using GraphQL.Types;
using GraphQL.Utilities;
using System;

namespace Api.Schemes
{
    public class GraphQLSchema : Schema
    {
        public GraphQLSchema(IServiceProvider provider) : base(provider)
        {            
            Query = provider.GetRequiredService<DishQuery>();
            // Mutation = new ProjectMutation(this.projectService, this.authService, this.eventRegistry);
        }
    }
}
