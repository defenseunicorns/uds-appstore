# App Store Package Metadata

## Creating Metadata for a new package

1. Grab the marketing material from the package website. (copy the entire homepage often works fine)
2. Use the [prompt](#prompt) and paste into ChatGPT
3. Copy the content to a new file `apps/[package-name].yaml`, verify accuracy
4. open a new Pull Request

### Prompt
```
Create a product description that follows this format (which becomes the description):
- [Tagline]
- [Brief description of what the app does and its main functions]
- [1-2 sentences on key benefits]
- [Description of user interface or key features]
- [Information on included components or integrations].

Product name: [Name of the package]

Here is the content to describe:
[copy paste the "marketing material on the package website]

Output the metadata in the following format:
---
kind: Application
metadata:
  name: [REPLACE]
spec:
  title: [REPLACE]
  repository: [REPLACE]
  description: |
    [REPLACE]
  links:
    - description: Product Website
      url: [REPLACE]
    - description: Helm Chart
      url: [REPLACE]
    - description: UDS Package Repository
      url: [REPLACE]
```
