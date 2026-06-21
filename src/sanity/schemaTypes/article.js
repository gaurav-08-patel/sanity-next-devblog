export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: R => R.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required()
    },
    {
      name: 'brief',
      type: 'text',
      title: 'Brief description',
      rows: 3
    },
    {
      name: 'body',
      type: 'array',
      title: 'Article body',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover image',
      options: { hotspot: true }
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at'
    },
  ]
}
