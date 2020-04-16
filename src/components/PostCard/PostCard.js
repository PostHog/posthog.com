import React from "react"
import { Link } from "gatsby"
import Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

const PostCard = ({ post }) => (
  <div>
    <Card title={
      <div>
        <Link to={post.fields.slug} style={{color:'black', fontWeight:'bold'}}>
          {post.frontmatter.title}
        </Link>
        <span style={{
          float: 'right',
          color: 'grey',
        }}>
          {post.frontmatter.date}
        </span>
      </div>
     } 
     >
      {post.excerpt}
     </Card>
    <br/>
  </div>
)

export default PostCard