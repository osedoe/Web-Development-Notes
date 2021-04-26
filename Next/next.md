# Next.js

## 1. Rendering

Next by default would pre-render every page, improving the performance and SEO of our apps out-the-box.

Next has two ways pre-rendering:

- *Static generation* (recommended way): The HTML is generated at _build time_ and will be reused one each request
- *Server-side rendering*: The HTML is generated on _each request_.

## 2. Fetching data

Next introduces three functions unique to the framework to help us fetch data for the aforementioned pre-rendering.

- `getStaticProps` (static generation): Fetch data at _build time_.
- `getStaticPaths` (static genration): Specifies _dynamic routes_ to pre-render pages based on the received data.
- `getServerSideProps` (server-side rendering): Fetch data on _each request_.

### 2.1. getStaticProps

If we write an asynchronous function `getStaticProps` in a page component, we will pre-render this page at build time using the props that get returned from this function.

```ts

type GetStaticProps = (context: Context) => GetStaticPropsReturn;

interface Context {
    params?: object; // route parameters for dynamic routes, like [id].js will appear as { id: ... }
    preview?: true | undefined; // defaults to true if it's in preview mode
    previewData?: object; // contains data set by setPreviewData
    locale?: string; 
    locales?: string[];
    defaultLocale?: string;
}

interface GetStaticPropsReturn {
    props: object; // It will declare the props that the page will receive
    revaldiate?: number; // Seconds after the page re-generation could happer
    notFound?: boolean; // let the page return a 404 status and page
    redirect?: {
        destination: string;
        permanent: boolean;
    }; // allows redirecting to internal and external resources
}

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {} // it will appear in the page component as props
    };
};
```

#### When to use getStaticProps?

