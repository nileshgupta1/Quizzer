// Authorization: Bearer OPENAI_API_KEY

require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const format_string = `
    The format of your response should be a valid JSON that looks like this:
    interface Question {
    question: string;
    choices?: string[];
    answer?: string;
    question_type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
    }[]
    When creating different variations of the quizes ENSURE BOTH HAVE THE SAME ROOT KEY VALUE: 'questions'.
`;

async function fetchQuiz() {
    //Use startChat or generateText functions whichever is needed
    const chat = model.startChat({
        //Use this history as system prompt
        history: [
            {
                role: "user",
                parts: [{ text: "You are a quiz generator that generates quiz questions and answers for users. It is very important that the format you answer with is valid JSON." }],
            },
            {
                role: "model",
                parts: [{ text: "Understood" }],
            },
        ],
        // generationConfig: {
        //     maxOutputTokens: 100,
        // },
    });


    const prompt = `In mathematics, the Chinese remainder theorem states that if one knows the remainders of the Euclidean division of an integer n by several integers, then one can determine uniquely the remainder of the division of n by the product of these integers, under the condition that the divisors are pairwise coprime (no two divisors share a common factor other than 1).

For example, if we know that the remainder of n divided by 3 is 2, the remainder of n divided by 5 is 3, and the remainder of n divided by 7 is 2, then without knowing the value of n, we can determine that the remainder of n divided by 105 (the product of 3, 5, and 7) is 23. Importantly, this tells us that if n is a natural number less than 105, then 23 is the only possible value of n.

The earliest known statement of the theorem is by the Chinese mathematician Sunzi in the Sunzi Suanjing in the 3rd to 5th century CE.

The Chinese remainder theorem is widely used for computing with large integers, as it allows replacing a computation for which one knows a bound on the size of the result by several similar computations on small integers.

The Chinese remainder theorem (expressed in terms of congruences) is true over every principal ideal domain. It has been generalized to any ring, with a formulation involving two-sided ideals.

History
The earliest known statement of the theorem, as a problem with specific numbers, appears in the 5th-century book Sunzi Suanjing by the Chinese mathematician Sunzi:[1]

There are certain things whose number is unknown. If we count them by threes, we have two left over; by fives, we have three left over; and by sevens, two are left over. How many things are there?[2]

Sunzi's work contains neither a proof nor a full algorithm.[3] What amounts to an algorithm for solving this problem was described by Aryabhata (6th century).[4] Special cases of the Chinese remainder theorem were also known to Brahmagupta (7th century) and appear in Fibonacci's Liber Abaci (1202).[5] The result was later generalized with a complete solution called Da-yan-shu (大衍術) in Qin Jiushao's 1247 Mathematical Treatise in Nine Sections [6] which was translated into English in early 19th century by British missionary Alexander Wylie.[7]


The Chinese remainder theorem appears in Gauss's 1801 book Disquisitiones Arithmeticae.[8]
The notion of congruences was first introduced and used by Carl Friedrich Gauss in his Disquisitiones Arithmeticae of 1801.[9] Gauss illustrates the Chinese remainder theorem on a problem involving calendars, namely, "to find the years that have a certain period number with respect to the solar and lunar cycle and the Roman indiction."[10] Gauss introduces a procedure for solving the problem that had already been used by Leonhard Euler but was in fact an ancient method that had appeared several times.[11]

Statement
Let n1, ..., nk be integers greater than 1, which are often called moduli or divisors. Let us denote by N the product of the ni.

The Chinese remainder theorem asserts that if the ni are pairwise coprime, and if a1, ..., ak are integers such that 0 ≤ ai < ni for every i, then there is one and only one integer x, such that 0 ≤ x < N and the remainder of the Euclidean division of x by ni is ai for every i.

This may be restated as follows in terms of congruences: If the 
𝑛
𝑖
{\displaystyle n_{i}} are pairwise coprime, and if a1, ..., ak are any integers, then the system

𝑥
≡
𝑎
1
(
mod
𝑛
1
)
⋮
𝑥
≡
𝑎
𝑘
(
mod
𝑛
𝑘
)
,
{\displaystyle {\begin{aligned}x&\equiv a_{1}{\pmod {n_{1}}}\\&\,\,\,\vdots \\x&\equiv a_{k}{\pmod {n_{k}}},\end{aligned}}}
has a solution, and any two solutions, say x1 and x2, are congruent modulo N, that is, x1 ≡ x2 (mod N ).[12]

In abstract algebra, the theorem is often restated as: if the ni are pairwise coprime, the map

𝑥
mod
𝑁
↦
(
𝑥
mod
𝑛
1
,
…
,
𝑥
mod
𝑛
𝑘
)
{\displaystyle x{\bmod {N}}\;\mapsto \;(x{\bmod {n}}_{1},\,\ldots ,\,x{\bmod {n}}_{k})}
defines a ring isomorphism[13]

𝑍
/
𝑁
𝑍
≅
𝑍
/
𝑛
1
𝑍
×
⋯
×
𝑍
/
𝑛
𝑘
𝑍
{\displaystyle \mathbb {Z} /N\mathbb {Z} \cong \mathbb {Z} /n_{1}\mathbb {Z} \times \cdots \times \mathbb {Z} /n_{k}\mathbb {Z} }
between the ring of integers modulo N and the direct product of the rings of integers modulo the ni. This means that for doing a sequence of arithmetic operations in 
𝑍
/
𝑁
𝑍
,
{\displaystyle \mathbb {Z} /N\mathbb {Z} ,} one may do the same computation independently in each 
𝑍
/
𝑛
𝑖
𝑍
{\displaystyle \mathbb {Z} /n_{i}\mathbb {Z} } and then get the result by applying the isomorphism (from the right to the left). This may be much faster than the direct computation if N and the number of operations are large. This is widely used, under the name multi-modular computation, for linear algebra over the integers or the rational numbers.

The theorem can also be restated in the language of combinatorics as the fact that the infinite arithmetic progressions of integers form a Helly family.[14]

Proof
The existence and the uniqueness of the solution may be proven independently. However, the first proof of existence, given below, uses this uniqueness.

Uniqueness
Suppose that x and y are both solutions to all the congruences. As x and y give the same remainder, when divided by ni, their difference x − y is a multiple of each ni. As the ni are pairwise coprime, their product N also divides x − y, and thus x and y are congruent modulo N. If x and y are supposed to be non-negative and less than N (as in the first statement of the theorem), then their difference may be a multiple of N only if x = y.

Existence (first proof)
The map

𝑥
mod
𝑁
↦
(
𝑥
mod
𝑛
1
,
…
,
𝑥
mod
𝑛
𝑘
)
{\displaystyle x{\bmod {N}}\mapsto (x{\bmod {n}}_{1},\ldots ,x{\bmod {n}}_{k})}
maps congruence classes modulo N to sequences of congruence classes modulo ni. The proof of uniqueness shows that this map is injective. As the domain and the codomain of this map have the same number of elements, the map is also surjective, which proves the existence of the solution.

This proof is very simple but does not provide any direct way for computing a solution. Moreover, it cannot be generalized to other situations where the following proof can.`;

    let msg = "";
    msg += "Create a quiz that has 5 multiple choice questions, 4 true and false questions, and 3 short_answer questions.\n";
    msg += `Here is the text found in the source document: ${prompt} \n`;
    msg += "Use the text found in the source document to create the number of questions defined before";

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    return text
}


module.exports = { fetchQuiz };