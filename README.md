# Racket Programming

![Language](https://img.shields.io/badge/language-MDX-6A5ACD)

[English](README.md) | [中文](README.zh-CN.md)

An online book about the Racket programming language, covering everything from the core language to real-world application development and language design. Written in Chinese.

Built with Next.js and MDX. Available online.

## Book Structure

### Part 1: Core Language

Fundamentals of Racket programming.

| Chapter | Topic |
|---------|-------|
| 01 | Introduction to Racket |
| 02 | S-expression Syntax |
| 03 | Data Types |
| 04 | Functions |
| 05 | Control Flow |
| 06 | Lists and Recursion |
| 07 | Structs and Vectors |
| 08 | Modules |

### Part 2: Advanced Features

Racket's more powerful capabilities.

| Chapter | Topic |
|---------|-------|
| 01 | Pattern Matching |
| 02 | Macros |
| 03 | Exceptions and Contracts |
| 04 | Concurrency |
| 05 | Regular Expressions and Parsing |

### Part 3: Applied Development

Building real-world applications with Racket.

| Chapter | Topic |
|---------|-------|
| 01 | Web Server |
| 02 | Routing and Templates |
| 03 | Database |
| 04 | RESTful API |
| 05 | GUI Basics |
| 06 | GUI: Drawing and Events |
| 07 | CLI Tools |
| 08 | Project |

### Part 4: Language Design

Racket's most unique capability — creating new languages with macros and `#lang`.

| Chapter | Topic |
|---------|-------|
| 01 | Language Design |
| 02 | Macros in Depth |
| 03 | Creating a Language |
| 04 | Type Systems |
| 05 | DSL Practice |

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Code Highlighting**: rehype-highlight

## Local Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Adding a New Chapter

1. Create a `.mdx` file under `content/part-N/`
2. The first line `# Title` becomes the chapter title
3. The second line `> Description` becomes the chapter summary
4. Re-run `npm run build` to regenerate the content index

File naming convention: `01-title.mdx`, `02-next-topic.mdx` — the numeric prefix controls ordering.

## Build

```bash
npm run build
```

Generates a static site in the `dist/` directory.
