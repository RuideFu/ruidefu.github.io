---
title: "I Forgot What “Rank” Means."
subtitle: "(Or Maybe I Never Knew)"
date: 2025-12-14T15:31:00-05:00
draft: false
summary: "A reflection on the mathematical definition of matrix rank, inspired by a YouTube short."
---

I saw a YouTube short the other day, the interviewer was asking random college students five questions related to their major. And one of the questions for a math major was: “what is the rank (of a matrix)?”


The interviewee couldn’t answer on the spot, though she claimed to have known it at one point. As a former math major, I feel like I should know the answer, but I couldn’t recall the exact definition either.


Browsing through the comment section, some people were attempting to answer the question while dunking on the interviewee at the same time. From what I recall, all the comments defined the rank as “number of non-zero rows of a matrix in its Reduced Row Echelon Form (RREF)”.


For those who don’t know, or need a refresher on linear algebra, RREF is a special case of Row Echelon Form, which is defined ([by wikipedia](https://en.wikipedia.org/wiki/Row_echelon_form)) as:

- All rows having only zero entries are at the bottom.
- The leading entry (that is, the leftmost non-zero entry) of every non-zero row, called the pivot, is to the right of the leading entry of every row above.

And RREF has two more conditions:

- The leading entry in each nonzero row is 1 (called a leading one).
- Each column containing a leading 1 has zeros in all its other entries.

Something doesn’t sit right with me. Using Gaussian Elimination (row operations) to find RREF is just the algorithm to _compute_ rank; but there must be an actual mathematical meaning to the concept itself.


Turns out, rank is defined as the dimensions of the vector space spanned by a matrix’s columns. In other words, number of linearly independent columns in that matrix. And intuitively, by doing Gaussian Elimination, columns that are merely linear combinations of others are 'eliminated’. (as the name implied). This is a much more satisfying definition, as now it provides a mathematical (and in some application physical) trait of the matrix.


Reflecting when I took linear algebra as a freshman, I was carried away by stress of homework and exam grades, and focused more on the problem solving aspect of the course. To be honest, besides the definition of rank, I don’t think I really understood linear space, kernel, or any functional analysis related topic at all. It wasn’t until I took Real Analysis and Convex Optimization, that those things really started to make sense.


I’ve always joked that the biggest takeaway from my math degree was realizing I wasn’t cut out for a career in math. But the runner-up lesson was developing my internal BS trigger, especially when it comes to definitions.
