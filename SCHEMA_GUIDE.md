# Schema.org Implementation Guide

This document outlines the structured data implementation for the Wareng Jaya Teknik website.

## Implemented Schema Types

### Business Information
- **Type**: LocalBusiness
- **Location**: Used sitewide, implemented in `StructuredData.jsx`
- **Purpose**: Provides search engines with detailed business information including address, hours, and services
- **Key Properties**:
  - name
  - image
  - url
  - logo
  - description
  - telephone
  - email
  - address
  - geo
  - priceRange
  - openingHoursSpecification
  - sameAs

### Blog Post Schema
- **Type**: BlogPosting
- **Location**: Blog post pages, implemented in `StructuredData.jsx`
- **Purpose**: Provides detailed information about blog articles for rich snippets
- **Key Properties**:
  - headline
  - description
  - image
  - author
  - publisher
  - datePublished
  - dateModified
  - keywords
  - wordCount
  - timeRequired
  - articleBody

### FAQ Schema
- **Type**: FAQPage
- **Location**: Blog posts with question-style headings, implemented in `BlogPostPage.jsx`
- **Purpose**: Enables FAQ rich snippets for content with question-answer format
- **Key Properties**:
  - mainEntity (array of Question objects)
    - name (the question)
    - acceptedAnswer (the answer text)

### Breadcrumb Schema
- **Type**: BreadcrumbList
- **Location**: All pages with breadcrumb navigation, implemented in `Breadcrumbs.jsx`
- **Purpose**: Enables breadcrumb rich snippets in search results
- **Key Properties**:
  - itemListElement (array of ListItem objects)
    - position
    - name
    - item (URL)

## Testing and Validation

All schema implementations should be validated using:
1. [Google's Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

## Development Debugging

For development environments, use the `SchemaDebug.jsx` component to visually inspect the generated schema.

## Implementation Notes

- All URLs should be absolute (including protocol and domain)
- Dates should use ISO 8601 format
- Ensure all required properties are provided for each schema type
- Use specific types rather than generic types where possible
