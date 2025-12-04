import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { Card, CardContent } from "@/components/ui/card";

export default function Lesson({ content }: { content: string }) {
  const [logged, setLogged] = useState(false);
  const hasScrolledRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      // Mark that user has started scrolling
      hasScrolledRef.current = true;
      
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate how far down the user has scrolled (0-100%)
      const scrollPercent = ((scrollTop + viewportHeight) / documentHeight) * 100;
      
      console.log("Scrolled %:", scrollPercent.toFixed(1));
      
      if (!logged && scrollPercent >= 60) {
        console.log("🔥 User reached 60% of the page!");
        setLogged(true);
      }
    };

    // Throttle the scroll handler
    const throttledScroll = () => {
      if (timeoutRef.current) return;
      
      timeoutRef.current = setTimeout(() => {
        handleScroll();
        timeoutRef.current = undefined;
      }, 100); // Adjust throttle time as needed
    };

    window.addEventListener("scroll", throttledScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [logged]);

  // Alternative: Only log after first scroll event
  useEffect(() => {
    let hasScrolled = false;
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        return; // Skip first scroll event
      }
      
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercent = ((scrollTop + viewportHeight) / documentHeight) * 100;
      
      console.log("Scrolled %:", scrollPercent.toFixed(1));
      
      if (!logged && scrollPercent >= 60) {
        console.log("🔥 User reached 60% of the page!");
        setLogged(true);
      }
    };

    // Throttle to avoid too many logs
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", throttledHandleScroll);
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [logged]);

  // Cleaner solution: Use Intersection Observer
  useEffect(() => {
    // Create an observer to track when 60% of the content is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("🔥 60% of lesson content is visible!");
            setLogged(true);
            observer.disconnect(); // Stop observing after triggering once
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% is visible
      }
    );

    // Create a marker element at 60% of the content height
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.top = '60%';
    marker.style.left = '0';
    marker.style.width = '100%';
    marker.style.height = '1px';
    marker.style.pointerEvents = 'none';
    marker.style.opacity = '0';

    // Find the card content to place the marker
    const cardContent = document.querySelector('.prose');
    if (cardContent) {
      cardContent.style.position = 'relative';
      cardContent.appendChild(marker);
      observer.observe(marker);
    }

    return () => {
      observer.disconnect();
      if (cardContent && cardContent.contains(marker)) {
        cardContent.removeChild(marker);
      }
    };
  }, []); // Empty dependency array since this only runs once

  return (
    <div className="w-full flex justify-center px-4 md:px-6 py-6">
      <Card className="max-w-4xl w-full shadow-md border dark:border-gray-700">
        <CardContent className="prose prose-neutral dark:prose-invert lg:prose-lg pt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mt-6 mb-4 text-blue-500">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-blue-400">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mt-5 mb-2 text-blue-300">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="my-3 text-[17px] leading-[1.7]">{children}</p>
              ),
              li: ({ children }) => <li className="my-1">{children}</li>,
              pre: ({ children }) => (
                <pre className="bg-[#0d1117] text-sm rounded-lg p-4 my-4 overflow-x-auto border border-gray-700 shadow-sm !scrollbar-thin">
                  {children}
                </pre>
              ),
              code: ({ className, children }) => (
                <code
                  className={`${className} rounded px-1.5 py-0.5 bg-gray-800 text-pink-400`}
                >
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-4 py-1 italic my-4 bg-gray-50 dark:bg-gray-900 rounded-sm text-gray-700 dark:text-gray-300">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4 border rounded-md dark:border-gray-700">
                  <table className="w-full border-collapse table-auto">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border px-3 py-2 font-semibold bg-gray-200 dark:bg-gray-800">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border px-3 py-2 dark:border-gray-700">
                  {children}
                </td>
              ),
              details: ({ children }) => (
                <details className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 my-5 shadow-sm">
                  {children}
                </details>
              ),
              summary: ({ children }) => (
                <summary className="font-semibold text-blue-500 mb-2 cursor-pointer">
                  {children}
                </summary>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
}