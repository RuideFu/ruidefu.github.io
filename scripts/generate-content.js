const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const md = require('markdown-it')({ html: true });

const contentDir = path.join(__dirname, '../content/posts');
const outputDir = path.join(__dirname, '../src/assets');
const outputFile = path.join(outputDir, 'blog-data.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  console.log(`Content directory not found: ${contentDir}`);
  process.exit(0);
}

const posts = [];
const files = fs.readdirSync(contentDir);

files.forEach(file => {
  if (path.extname(file) === '.md') {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Skip drafts
    if (data.draft) {
        return;
    }

    // Convert markdown to HTML
    const htmlContent = md.render(content);
    
    // Create slug from filename (e.g. "my-post.md" -> "my-post")
    const slug = path.basename(file, '.md');

    // Extract first image if available
    const imageMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    const image = imageMatch ? imageMatch[1] : null;

    posts.push({
      ...data,
      slug: slug,
      image: image,
      content: htmlContent,
      // Create a clean URL for router
      url: `/blog/${slug}`
    });
  }
});

// Sort posts by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const output = {
  data: posts
};

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
console.log(`Successfully generated ${posts.length} posts to ${outputFile}`);
