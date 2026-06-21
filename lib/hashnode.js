// ─── Hashnode GraphQL Client ─────────────────────────
// All public read queries — no API key required.
// Swap HASHNODE_HOST with your actual publication host.

const HASHNODE_GQL = "https://gql.hashnode.com";

// ⬇️  Replace with YOUR hashnode publication host
const HASHNODE_HOST = process.env.NEXT_PUBLIC_HASHNODE_HOST || "yourusername.hashnode.dev";

// ── Generic fetcher ─────────────────────────────────────
async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Hashnode GraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors[0]?.message || "GraphQL request failed");
  }

  return json.data;
}

// ── Get all posts (for listing pages & search index) ────
export async function getAllPosts() {
  const query = `
    query AllPosts($host: String!) {
      publication(host: $host) {
        posts(first: 50) {
          edges {
            node {
              id
              title
              slug
              brief
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
                slug
              }
              seo {
                title
                description
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { host: HASHNODE_HOST });
  const edges = data?.publication?.posts?.edges || [];

  return edges.map((edge) => edge.node);
}

// ── Get a single post by slug (for [slug] page) ─────────
export async function getPostBySlug(slug) {
  const query = `
    query PostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          slug
          brief
          publishedAt
          readTimeInMinutes
          coverImage {
            url
          }
          tags {
            name
            slug
          }
          seo {
            title
            description
          }
          content {
            html
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { host: HASHNODE_HOST, slug });

  return data?.publication?.post ?? null;
}

// ── Get posts filtered by tag slug ──────────────────────
export async function getPostsByTag(tagSlug) {
  // Hashnode doesn't support a direct tag-filter on the publication
  // posts query, so we fetch all and filter client-side.
  // For large publications you could paginate with cursors instead.
  const allPosts = await getAllPosts();

  return allPosts.filter((post) =>
    post.tags?.some((tag) => tag.slug === tagSlug)
  );
}
