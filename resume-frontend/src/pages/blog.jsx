import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Blog = () => {
    const { repo } = useParams();
    const [content, setContent] = useState(null);
    const [description, setDescription] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [finalContent, setFinalContent] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const getBlog = async () => {
            try {
                const response = await axios.get(`/blog/${repo}`, {
                    signal: controller.signal,
                });
                setThumbnail(response.data.thumbnail);
                setDescription(response.data.description);
                setContent(response.data.readmeHtml);
            } catch (err) {
                console.error(err);
            }
        };
        getBlog();
        return () => {
            controller.abort();
        };
    }, []);

    const descriptionList = () => {
        return `
            <ul class='blog-description'>
                <li><span>Description: </span>${description[0]}</li>
                <li><span>Tech stack: </span>${description[1]}</li>
                <li><span>Testing: </span>${description[2]}</li>
                <li><span>Skills: </span>${description[3]}</li>
            </ul>
            `;
    };

    const blog = () => {
        const BlogStyle = styled.div`
            .blog-title-card .blog-title-card-image {
                background-image: url("${thumbnail}");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        `;
        return (
            <BlogStyle
                className="blog"
                dangerouslySetInnerHTML={{ __html: finalContent }}
            />
        );
    };

    useEffect(() => {
        if (content === null) return;
        const parts = content.split(/(?<=<\/h1>)/);
        const head =
            "<div class='blog-title-card'><div class='blog-title-card-details'>";
        const tail = "</div><div class='blog-title-card-image'></div></div>";
        setFinalContent(
            `${head + parts[0] + descriptionList() + tail + parts[1]}`,
        );
    }, [content]);

    return (
        <>
            <div className="blog-container">{blog()}</div>
        </>
    );
};
export default Blog;
