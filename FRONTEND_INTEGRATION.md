# Ximler Frontend Integration Guide (GraphQL)

This document provides comprehensive guidance on integrating the Ximler GraphQL API with various frontend frameworks using Apollo Client.

## Apollo Client Setup

### 1. Installation

```bash
npm install @apollo/client graphql
# or
yarn add @apollo/client graphql
```

### 2. Apollo Client Configuration

```typescript
// apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
     uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
     const token = localStorage.getItem("token");
     return {
          headers: {
               ...headers,
               authorization: token ? `Bearer ${token}` : "",
          },
     };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
     if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
               console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          });
     }

     if (networkError) {
          console.error(`[Network error]: ${networkError}`);

          // Handle token expiration
          if (networkError.statusCode === 401) {
               localStorage.removeItem("token");
               window.location.href = "/auth";
          }
     }
});

export const client = new ApolloClient({
     link: from([errorLink, authLink, httpLink]),
     cache: new InMemoryCache({
          typePolicies: {
               User: {
                    fields: {
                         projects: {
                              merge(existing = [], incoming) {
                                   return [...existing, ...incoming];
                              },
                         },
                    },
               },
          },
     }),
     defaultOptions: {
          watchQuery: {
               errorPolicy: "all",
          },
          query: {
               errorPolicy: "all",
          },
     },
});
```

## GraphQL Queries and Mutations

### 1. Authentication Queries

```typescript
// graphql/auth.ts
import { gql } from "@apollo/client";

export const GET_USER = gql`
     query GetUser {
          me {
               id
               name
               email
               avatar
               emailVerified
               lastLogin
               subscription {
                    id
                    status
                    startDate
                    endDate
                    autoRenew
                    price
                    currency
                    plan {
                         id
                         name
                         description
                         price
                         currency
                         interval
                         features
                         limits {
                              projects
                              storage
                              apiCalls
                         }
                    }
               }
               usage {
                    current {
                         projects
                         storage
                         apiCalls
                    }
                    limits {
                         projects
                         storage
                         apiCalls
                    }
                    usage {
                         projects
                         storage
                         apiCalls
                    }
               }
          }
     }
`;

export const LOGIN = gql`
     mutation Login($input: LoginInput!) {
          login(input: $input) {
               user {
                    id
                    name
                    email
                    avatar
                    emailVerified
               }
               token
          }
     }
`;

export const REGISTER = gql`
     mutation Register($input: RegisterInput!) {
          register(input: $input) {
               user {
                    id
                    name
                    email
                    emailVerified
               }
               token
          }
     }
`;

export const VERIFY_EMAIL = gql`
     mutation VerifyEmail($token: String!) {
          verifyEmail(token: $token) {
               message
          }
     }
`;

export const FORGOT_PASSWORD = gql`
     mutation ForgotPassword($email: String!) {
          forgotPassword(email: $email) {
               message
          }
     }
`;

export const RESET_PASSWORD = gql`
     mutation ResetPassword($token: String!, $newPassword: String!) {
          resetPassword(token: $token, newPassword: $newPassword) {
               message
          }
     }
`;
```

### 2. Subscription Queries

```typescript
// graphql/subscription.ts
import { gql } from "@apollo/client";

export const GET_PLANS = gql`
     query GetPlans {
          plans {
               id
               name
               description
               price
               currency
               interval
               features
               limits {
                    projects
                    storage
                    apiCalls
               }
          }
     }
`;

export const GET_PLAN = gql`
     query GetPlan($id: ID!) {
          plan(id: $id) {
               id
               name
               description
               price
               currency
               interval
               features
               limits {
                    projects
                    storage
                    apiCalls
               }
          }
     }
`;

export const CREATE_SUBSCRIPTION = gql`
     mutation CreateSubscription($input: CreateSubscriptionInput!) {
          createSubscription(input: $input) {
               subscription {
                    id
                    status
                    startDate
                    endDate
                    autoRenew
                    price
                    currency
                    plan {
                         id
                         name
                         limits {
                              projects
                              storage
                              apiCalls
                         }
                    }
               }
               invoice {
                    id
                    amount
                    currency
                    status
                    invoiceUrl
               }
          }
     }
`;

export const UPDATE_SUBSCRIPTION = gql`
     mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
          updateSubscription(input: $input) {
               subscription {
                    id
                    status
                    plan {
                         id
                         name
                         price
                         limits {
                              projects
                              storage
                              apiCalls
                         }
                    }
               }
          }
     }
`;

export const CANCEL_SUBSCRIPTION = gql`
     mutation CancelSubscription($input: CancelSubscriptionInput) {
          cancelSubscription(input: $input) {
               message
          }
     }
`;
```

### 3. Usage Queries

```typescript
// graphql/usage.ts
import { gql } from "@apollo/client";

export const GET_USAGE_STATS = gql`
     query GetUsageStats($period: String) {
          usageStats(period: $period) {
               current {
                    projects
                    storage
                    apiCalls
               }
               limits {
                    projects
                    storage
                    apiCalls
               }
               usage {
                    projects
                    storage
                    apiCalls
               }
               period {
                    start
                    end
               }
          }
     }
`;

export const CHECK_USAGE_LIMIT = gql`
     query CheckUsageLimit($input: UsageCheckInput!) {
          checkUsageLimit(input: $input) {
               allowed
               current
               limit
               remaining
          }
     }
`;

export const INCREMENT_USAGE = gql`
     mutation IncrementUsage($input: IncrementUsageInput!) {
          incrementUsage(input: $input) {
               message
          }
     }
`;
```

### 4. Project Queries

```typescript
// graphql/projects.ts
import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
     query GetProjects($page: Int, $limit: Int) {
          projects(page: $page, limit: $limit) {
               projects {
                    id
                    name
                    description
                    settings
                    canvasData
                    storageSize
                    createdAt
                    updatedAt
               }
               totalCount
               pageInfo {
                    page
                    limit
                    totalPages
                    hasNextPage
                    hasPreviousPage
               }
          }
     }
`;

export const GET_PROJECT = gql`
     query GetProject($id: ID!) {
          project(id: $id) {
               id
               name
               description
               settings
               canvasData
               storageSize
               createdAt
               updatedAt
          }
     }
`;

export const CREATE_PROJECT = gql`
     mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) {
               id
               name
               description
               settings
               canvasData
               storageSize
               createdAt
               updatedAt
          }
     }
`;

export const UPDATE_PROJECT = gql`
     mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
          updateProject(id: $id, input: $input) {
               id
               name
               description
               settings
               canvasData
               storageSize
               createdAt
               updatedAt
          }
     }
`;

export const DELETE_PROJECT = gql`
     mutation DeleteProject($id: ID!) {
          deleteProject(id: $id)
     }
`;
```

## React/Next.js Integration

### 1. Apollo Provider Setup

```typescript
// pages/_app.tsx
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import { AuthProvider } from "../hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
     return (
          <ApolloProvider client={client}>
               <AuthProvider>
                    <Component {...pageProps} />
               </AuthProvider>
          </ApolloProvider>
     );
}
```

### 2. Authentication Hook

```typescript
// hooks/useAuth.ts
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, REGISTER, GET_USER } from "../graphql/auth";
import { useState, createContext, useContext } from "react";

interface User {
     id: string;
     name: string;
     email: string;
     avatar?: string;
     emailVerified: boolean;
     subscription?: {
          plan: {
               name: string;
               limits: {
                    projects: number;
                    storage: number;
                    apiCalls: number;
               };
          };
          status: string;
          endDate?: string;
     };
     usage?: {
          current: {
               projects: number;
               storage: number;
               apiCalls: number;
          };
          limits: {
               projects: number;
               storage: number;
               apiCalls: number;
          };
     };
}

interface AuthContextType {
     user: User | null;
     loading: boolean;
     login: (email: string, password: string) => Promise<void>;
     register: (userData: any) => Promise<void>;
     logout: () => void;
     refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
     const [user, setUser] = useState<User | null>(null);
     const {
          data: userData,
          loading,
          refetch,
     } = useQuery(GET_USER, {
          errorPolicy: "ignore",
          onCompleted: (data) => {
               if (data.me) {
                    setUser(data.me);
               }
          },
     });

     const [loginMutation] = useMutation(LOGIN);
     const [registerMutation] = useMutation(REGISTER);

     const login = async (email: string, password: string) => {
          try {
               const { data } = await loginMutation({
                    variables: {
                         input: { email, password },
                    },
               });

               localStorage.setItem("token", data.login.token);
               setUser(data.login.user);
               await refetch();
          } catch (error) {
               console.error("Login failed:", error);
               throw error;
          }
     };

     const register = async (userData: any) => {
          try {
               const { data } = await registerMutation({
                    variables: {
                         input: userData,
                    },
               });

               localStorage.setItem("token", data.register.token);
               setUser(data.register.user);
               await refetch();
          } catch (error) {
               console.error("Registration failed:", error);
               throw error;
          }
     };

     const logout = () => {
          localStorage.removeItem("token");
          setUser(null);
          client.clearStore();
     };

     const refreshUser = async () => {
          await refetch();
     };

     return <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
     const context = useContext(AuthContext);
     if (context === undefined) {
          throw new Error("useAuth must be used within an AuthProvider");
     }
     return context;
}
```

### 3. Subscription Management Hook

```typescript
// hooks/useSubscription.ts
import { useMutation, useQuery } from "@apollo/client";
import { GET_PLANS, CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION, CANCEL_SUBSCRIPTION } from "../graphql/subscription";
import { useAuth } from "./useAuth";

export function useSubscription() {
     const { user } = useAuth();
     const { data: plansData, loading: plansLoading } = useQuery(GET_PLANS);
     const [createSubscriptionMutation, { loading: createLoading }] = useMutation(CREATE_SUBSCRIPTION);
     const [updateSubscriptionMutation, { loading: updateLoading }] = useMutation(UPDATE_SUBSCRIPTION);
     const [cancelSubscriptionMutation, { loading: cancelLoading }] = useMutation(CANCEL_SUBSCRIPTION);

     const createSubscription = async (planId: string, paymentMethodId: string, couponCode?: string) => {
          try {
               const { data } = await createSubscriptionMutation({
                    variables: {
                         input: {
                              planId,
                              paymentMethodId,
                              couponCode,
                         },
                    },
               });

               return data.createSubscription;
          } catch (error) {
               console.error("Subscription creation failed:", error);
               throw error;
          }
     };

     const updateSubscription = async (newPlanId: string) => {
          try {
               const { data } = await updateSubscriptionMutation({
                    variables: {
                         input: {
                              planId: newPlanId,
                         },
                    },
               });

               return data.updateSubscription;
          } catch (error) {
               console.error("Subscription update failed:", error);
               throw error;
          }
     };

     const cancelSubscription = async (reason?: string) => {
          try {
               const { data } = await cancelSubscriptionMutation({
                    variables: {
                         input: {
                              reason,
                              feedback: reason,
                         },
                    },
               });

               return data.cancelSubscription;
          } catch (error) {
               console.error("Subscription cancellation failed:", error);
               throw error;
          }
     };

     return {
          plans: plansData?.plans || [],
          currentPlan: user?.subscription?.plan,
          loading: plansLoading || createLoading || updateLoading || cancelLoading,
          createSubscription,
          updateSubscription,
          cancelSubscription,
     };
}
```

### 4. Usage Monitoring Hook

```typescript
// hooks/useUsage.ts
import { useMutation, useQuery } from "@apollo/client";
import { GET_USAGE_STATS, CHECK_USAGE_LIMIT, INCREMENT_USAGE } from "../graphql/usage";

export function useUsage() {
     const { data: statsData, loading: statsLoading, refetch: refetchStats } = useQuery(GET_USAGE_STATS);
     const [checkUsageLimitMutation] = useMutation(CHECK_USAGE_LIMIT);
     const [incrementUsageMutation] = useMutation(INCREMENT_USAGE);

     const checkUsageLimit = async (resourceType: string, amount: number = 1) => {
          try {
               const { data } = await checkUsageLimitMutation({
                    variables: {
                         input: {
                              resourceType,
                              amount,
                         },
                    },
               });

               return data.checkUsageLimit;
          } catch (error) {
               console.error("Usage check failed:", error);
               return { allowed: false };
          }
     };

     const incrementUsage = async (resourceType: string, amount: number, metadata?: any) => {
          try {
               const { data } = await incrementUsageMutation({
                    variables: {
                         input: {
                              resourceType,
                              amount,
                              metadata,
                         },
                    },
               });

               // Refresh stats after increment
               await refetchStats();
               return data.incrementUsage;
          } catch (error) {
               console.error("Usage increment failed:", error);
               throw error;
          }
     };

     return {
          stats: statsData?.usageStats,
          loading: statsLoading,
          checkUsageLimit,
          incrementUsage,
          refetchStats,
     };
}
```

### 5. Project Management Hook

```typescript
// hooks/useProjects.ts
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "../graphql/projects";
import { useUsage } from "./useUsage";

export function useProjects() {
     const { checkUsageLimit, incrementUsage } = useUsage();
     const { data: projectsData, loading: projectsLoading, refetch: refetchProjects } = useQuery(GET_PROJECTS);
     const [createProjectMutation, { loading: createLoading }] = useMutation(CREATE_PROJECT);
     const [updateProjectMutation, { loading: updateLoading }] = useMutation(UPDATE_PROJECT);
     const [deleteProjectMutation, { loading: deleteLoading }] = useMutation(DELETE_PROJECT);

     const createProject = async (projectData: any) => {
          // Check usage limit first
          const limitCheck = await checkUsageLimit("projects", 1);
          if (!limitCheck.allowed) {
               throw new Error("Project limit exceeded. Please upgrade your plan.");
          }

          try {
               const { data } = await createProjectMutation({
                    variables: {
                         input: projectData,
                    },
               });

               // Increment usage
               await incrementUsage("projects", 1, {
                    projectId: data.createProject.id,
                    action: "create",
               });

               // Refresh projects list
               await refetchProjects();
               return data.createProject;
          } catch (error) {
               console.error("Project creation failed:", error);
               throw error;
          }
     };

     const updateProject = async (projectId: string, updateData: any) => {
          try {
               const { data } = await updateProjectMutation({
                    variables: {
                         id: projectId,
                         input: updateData,
                    },
               });

               // Refresh projects list
               await refetchProjects();
               return data.updateProject;
          } catch (error) {
               console.error("Project update failed:", error);
               throw error;
          }
     };

     const deleteProject = async (projectId: string) => {
          try {
               await deleteProjectMutation({
                    variables: {
                         id: projectId,
                    },
               });

               // Refresh projects list
               await refetchProjects();
          } catch (error) {
               console.error("Project deletion failed:", error);
               throw error;
          }
     };

     return {
          projects: projectsData?.projects?.projects || [],
          totalCount: projectsData?.projects?.totalCount || 0,
          pageInfo: projectsData?.projects?.pageInfo,
          loading: projectsLoading || createLoading || updateLoading || deleteLoading,
          createProject,
          updateProject,
          deleteProject,
          refetchProjects,
     };
}
```

## Vue.js Integration

### 1. Apollo Client Setup

```typescript
// apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
     uri: process.env.VUE_APP_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
     const token = localStorage.getItem("token");
     return {
          headers: {
               ...headers,
               authorization: token ? `Bearer ${token}` : "",
          },
     };
});

export const apolloClient = new ApolloClient({
     link: authLink.concat(httpLink),
     cache: new InMemoryCache(),
});
```

### 2. Vue Composition API

```typescript
// composables/useAuth.ts
import { ref, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { GET_USER, LOGIN, REGISTER } from "../graphql/auth";

export function useAuth() {
     const user = ref(null);
     const loading = ref(true);

     const {
          result: userResult,
          loading: userLoading,
          refetch: refetchUser,
     } = useQuery(
          GET_USER,
          {},
          {
               errorPolicy: "ignore",
               onResult: (result) => {
                    if (result.data?.me) {
                         user.value = result.data.me;
                    }
                    loading.value = false;
               },
               onError: () => {
                    loading.value = false;
               },
          }
     );

     const { mutate: loginMutation } = useMutation(LOGIN);
     const { mutate: registerMutation } = useMutation(REGISTER);

     const isAuthenticated = computed(() => !!user.value);
     const isProUser = computed(() => user.value?.subscription?.plan?.name === "Pro" || user.value?.subscription?.plan?.name === "Enterprise");

     const login = async (email: string, password: string) => {
          try {
               const result = await loginMutation({
                    input: { email, password },
               });

               localStorage.setItem("token", result.data.login.token);
               user.value = result.data.login.user;
               await refetchUser();
          } catch (error) {
               console.error("Login failed:", error);
               throw error;
          }
     };

     const register = async (userData: any) => {
          try {
               const result = await registerMutation({
                    input: userData,
               });

               localStorage.setItem("token", result.data.register.token);
               user.value = result.data.register.user;
               await refetchUser();
          } catch (error) {
               console.error("Registration failed:", error);
               throw error;
          }
     };

     const logout = () => {
          localStorage.removeItem("token");
          user.value = null;
          apolloClient.clearStore();
     };

     return {
          user,
          loading,
          isAuthenticated,
          isProUser,
          login,
          register,
          logout,
          refetchUser,
     };
}
```

## Angular Integration

### 1. Apollo Client Setup

```typescript
// apollo.config.ts
import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

export function createApollo(httpLink: HttpLink) {
     const authLink = setContext((_, { headers }) => {
          const token = localStorage.getItem("token");
          return {
               headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
               },
          };
     });

     return {
          link: authLink.concat(httpLink.create({ uri: "http://localhost:4000/graphql" })),
          cache: new InMemoryCache(),
     };
}

@NgModule({
     imports: [ApolloModule],
     providers: [
          {
               provide: APOLLO_OPTIONS,
               useFactory: createApollo,
               deps: [HttpLink],
          },
     ],
})
export class GraphQLModule {}
```

### 2. Angular Service

```typescript
// services/auth.service.ts
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { GET_USER, LOGIN, REGISTER } from "../graphql/auth";

@Injectable({
     providedIn: "root",
})
export class AuthService {
     private userSubject = new BehaviorSubject<any>(null);
     public user$ = this.userSubject.asObservable();

     constructor(private apollo: Apollo) {
          this.checkAuth();
     }

     checkAuth(): void {
          this.apollo
               .watchQuery({
                    query: GET_USER,
                    errorPolicy: "ignore",
               })
               .valueChanges.subscribe({
                    next: (result) => {
                         if (result.data && (result.data as any).me) {
                              this.userSubject.next((result.data as any).me);
                         }
                    },
                    error: () => {
                         this.logout();
                    },
               });
     }

     login(email: string, password: string): Observable<any> {
          return this.apollo
               .mutate({
                    mutation: LOGIN,
                    variables: {
                         input: { email, password },
                    },
               })
               .pipe(
                    map((result: any) => result.data.login),
                    tap((response) => {
                         localStorage.setItem("token", response.token);
                         this.userSubject.next(response.user);
                    })
               );
     }

     register(userData: any): Observable<any> {
          return this.apollo
               .mutate({
                    mutation: REGISTER,
                    variables: {
                         input: userData,
                    },
               })
               .pipe(
                    map((result: any) => result.data.register),
                    tap((response) => {
                         localStorage.setItem("token", response.token);
                         this.userSubject.next(response.user);
                    })
               );
     }

     logout(): void {
          localStorage.removeItem("token");
          this.userSubject.next(null);
          this.apollo.client.clearStore();
     }
}
```

## Error Handling

### 1. Global Error Handler

```typescript
// utils/errorHandler.ts
import { ApolloError } from "@apollo/client";

export class GraphQLError extends Error {
     constructor(public code: string, message: string, public extensions?: any) {
          super(message);
          this.name = "GraphQLError";
     }
}

export function handleGraphQLError(error: ApolloError): string {
     if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const graphQLError = error.graphQLErrors[0];
          return graphQLError.message;
     }

     if (error.networkError) {
          return "Network error occurred. Please check your connection.";
     }

     return "An unexpected error occurred";
}

// React Error Boundary
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
     constructor(props: any) {
          super(props);
          this.state = { hasError: false, error: null };
     }

     static getDerivedStateFromError(error: Error) {
          return { hasError: true, error };
     }

     componentDidCatch(error: Error, errorInfo: any) {
          console.error("Error caught by boundary:", error, errorInfo);
     }

     render() {
          if (this.state.hasError) {
               return (
                    <div className="p-8 text-center">
                         <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
                         <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
                         <button onClick={() => this.setState({ hasError: false, error: null })} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                              Try again
                         </button>
                    </div>
               );
          }

          return this.props.children;
     }
}
```

## Testing

### 1. Jest Test Examples

```typescript
// __tests__/auth.test.ts
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { AuthProvider } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import { LOGIN } from "../graphql/auth";

const mocks = [
     {
          request: {
               query: LOGIN,
               variables: {
                    input: {
                         email: "john@example.com",
                         password: "password123",
                    },
               },
          },
          result: {
               data: {
                    login: {
                         user: {
                              id: "1",
                              name: "John Doe",
                              email: "john@example.com",
                         },
                         token: "mock-token",
                    },
               },
          },
     },
];

describe("Authentication", () => {
     test("should login successfully", async () => {
          render(
               <MockedProvider mocks={mocks} addTypename={false}>
                    <AuthProvider>
                         <LoginForm />
                    </AuthProvider>
               </MockedProvider>
          );

          fireEvent.change(screen.getByLabelText(/email/i), {
               target: { value: "john@example.com" },
          });
          fireEvent.change(screen.getByLabelText(/password/i), {
               target: { value: "password123" },
          });
          fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

          await waitFor(() => {
               expect(screen.getByText("Welcome back!")).toBeInTheDocument();
          });
     });
});
```

## Performance Optimization

### 1. Query Optimization

```typescript
// Use fragments for reusable fields
export const USER_FRAGMENT = gql`
     fragment UserFragment on User {
          id
          name
          email
          avatar
          emailVerified
     }
`;

// Use pagination for large datasets
export const GET_PROJECTS_PAGINATED = gql`
     query GetProjects($page: Int, $limit: Int) {
          projects(page: $page, limit: $limit) {
               projects {
                    ...ProjectFragment
               }
               pageInfo {
                    hasNextPage
                    hasPreviousPage
                    totalPages
               }
          }
     }
     ${PROJECT_FRAGMENT}
`;
```

### 2. Cache Management

```typescript
// Update cache after mutations
const [createProject] = useMutation(CREATE_PROJECT, {
     update(cache, { data }) {
          const existingProjects = cache.readQuery({ query: GET_PROJECTS });
          cache.writeQuery({
               query: GET_PROJECTS,
               data: {
                    projects: {
                         ...existingProjects.projects,
                         projects: [...existingProjects.projects.projects, data.createProject],
                    },
               },
          });
     },
});
```

## Environment Variables

```env
# GraphQL Endpoint
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
VUE_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
GRAPHQL_ENDPOINT=http://localhost:4000/graphql

# Production
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.ximler.com/graphql
```

This comprehensive guide provides everything needed to integrate Ximler's GraphQL API with various frontend frameworks using Apollo Client.
