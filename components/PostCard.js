// components/PostCard.js — Article preview card (placeholder)
export default function PostCard({ post }) {
  return (
    <article>
      <h2>{post?.title}</h2>
      <p>{post?.brief}</p>
    </article>
  );
}
