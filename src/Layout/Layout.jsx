import React from "react";
import { Helmet } from "react-helmet";
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children, title, description, keyword, author}) => {
  return (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword} />
            <meta name="author" content={author} />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-MCw98/M6y/fP96jBk4yVxM84+98x5yZJGABs7L3U4E5g7jRM" crossorigin="anonymous" />
        </Helmet>
        <main>{children}</main>
    </>
  )
}
Layout.defaultProps = {
    title: "React App",
    description: "A simple React app",
    keyword: "react, app",
    author: "John Doe"
}

export default Layout