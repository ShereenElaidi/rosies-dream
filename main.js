let r = String.raw; // raw string tag for convenient LateX/KaTeX

function renderMath() {
  renderMathInElement(document.body, {
    // ...options...
    delimiters: 
    [
      {left: r`\[`, right: r`\]`, display: true},
      {left: r`\(`, right: r`\)`, display: false},
    ],
    macros: {
      "\\Z": r`\mathbb Z`,
      "\\R": r`\mathbb R`,
      "\\Q": r`\mathbb Q`,
      "\\Aut": r`\operatorname{Aut}`,
      "\\Inn": r`\operatorname{Inn}`,
      "\\Sym": r`\operatorname{Sym}`,
      "\\inv": r`^{-1}`,
      "\\surject": r`\twoheadrightarrow`,
      "\\inject": r`\hookrightarrow`,
      "\\isom": r`\cong`,
    }
  });
}

function updateCompletion(completion, element) {
  const amountCompleted = completion.reduce((acc, cur) => acc + (cur ? 1 : 0), 0); // count amount of true values
  element.innerHTML = r`Completed \( \frac{${amountCompleted}}{${completion.length}} \)`;
  renderMath();
}

function pick(questions, completion, element) {
  let choice = -1;

  if (completion.every(e => e)) {
    element.innerHTML = "<b> Congrats. </b> You have finished all problems!"
  } else {
    while (choice < 0 || completion[choice]) {
      choice = Math.floor(Math.random() * questions.length);
    }

    completion[choice] = true;

    element.innerHTML = "<b> Problem. </b>" + questions[choice];
    renderMath();
  }
}

function showAll(questions, element) {
  element.innerHTML = "<b> Problem. </b>" + questions.reduce((acc, cur) => acc + "</br></br></br></br></br> <b> Problem. </b>" + cur);
  renderMath();
}

function createList(type, ...strings) {
  let template = `<ol type=${type}>`
  template += strings.map(s => `<li>${s}</li>`).reduce((acc, cur) => acc + cur);
  template += `</ol>`
  return template;
}

let questions = [
  r`Describe all the subgroups of \( \Z \).`,
  r`Let \( G \) be a group and \( S \subseteq G \) be a nonempty subset.` + "\n"
  + r`Write \( S_\pm \coloneqq S \cup S \)` + "\n"
  + createList(1,
    r`Describe \( S_\pm^n \) for \( G = \Z \) and \( S = \{ 1 \} \)`,
    r`Show that the set \[ \langle S \rangle := \bigcup_{n \geq 1} S_\pm^n \] is a subgroup of \( G \).`,
    r`Show that \( \langle S \rangle \) is the smallest subgroup of \( G \) containing \( S \), i.e. \[ \langle S \rangle = \bigcap_{H \subseteq S} H. \]`,
  ),
  r`Describe all the groups generated by 2 elements, such that every non trivial element is an involution.`,
  r`Show that every cancellative finite semigroup is a group.`,
  r`Prove Lagrange's theorem.`, // end of assignment 1
  createList(1, r`Describe the subgroups of \( \Z / n\Z \)`, r`Show that \( \sum_{k\; | \; n} \varphi(k) = n \).`),
  createList(1,
    r`Show that a finite cyclic group contains at most one element of order 2.`,
    r`Let \( k \geq 1 \). Show that \( 5^{2^k} = 1 + 2^{k+2}m \) where \( m \) is an odd number.`,
    r`Let \( k \geq 2 \). Compute the order of 5 in \( (\Z / 2^k \Z)^\times \).`,
    r`Let \( k \geq 3 \). Show that \( 5^{2^{k-3}} \neq 1 \; \mathrm{mod} \; 2^k \).`,
    r`Show that \( (\Z / 2^k\Z)^\times \) is generated by 2 elements. When can it be generated by a single element?`,
  ),
  r`Show that \( \Q \) is not finitely generated.`,
  r`Show that if \( w \) is a word, or more generally \( W \) is a set of words, then the subgroup \( \langle S \rangle \) of \( G \) `
  + r`generated by the set \( S \) obtained by substituting the letters in \( w \) (or in the set of \( w \in W \)) by elements in \( G \) is characteristic.`,
  createList(1,
    r`Show that every subgroup of \( \Z/n\Z \) is characteristic (so for \( \Z/n\Z \), simple \( \iff \) characteristically simple \( \iff \) \( n \) prime).`,
    r`Let \( p \) be a prime number. Show that \( \operatorname{GL}_n(\Z/p\Z) \) acts transitively on \( (\Z/p\Z) \setminus \{ (0, \ldots, 0)\} \), and `
    + r`that \( (\Z/p\Z)^n \) is characteristically simple.`,
    r`Let \( G \) be a finite group. Show that if \( \Aut(G) \) acts transitively on \( G \setminus \{ e \} \), then \( G \) is elementary abelian.`,
  ),
  r`Let \( G \) be a group.`
  + createList(1,
    r`Show that if \( G/Z(G) \) is singly generated, then \( G \) is abelian`,
    r`Show that if \( \Inn(G) \) is singly generated, then it must be the trivial group.`
  ), // end of assignment 2
  createList(1,
    r`Write every cycle of odd length greate than 5 as a product of 3-cycles.`,
    r`Show that the set of 3-cycles is a generating set of \( A_n \).`
  ),
  r`Compute the center of \( D_n \).`,
  createList(1,
    r`Prove from first principles that the identity permutation can only be written as a product of an even number of transpositions`,
    r`Deduce from (1) that`
    + createList("a", r`the parity of a permutation is well defined, and`, r`the signature is a group homomorphism.`)
  ),
  createList(1,
    r`Show if \( \tau \in S_n \) is arbitrary and \( \sigma = (a, b, d, c, e) \in S_n \) is a \( k \)-cycle, then`
    + r`\[ \tau \sigma \tau\inv = (\tau(a), \tau(b), \tau(c), \tau(d), \tau(e), \ldots)  .\]`,
    r`Two permutations are said to have congruent cycle decomposition if they have the same number of \( k \)-cycles for every \( k \). `
    + r`Show that two permutations \( \sigma, \sigma' \) have congruent cycle decompositions if and only if they are conjugate, i.e., there exists `
    + r`\( \tau \) such that \( \sigma' = \tau \sigma \tau\inv \).`
  ),
  createList(1,
    r`Show that there are two conjugacy classes of 5-cycles in \( A_5 \).`,
    r`Show that the following conditions are equivalent:`
    + createList("a",
      r`the \( S_n \)-conjugacy classes of a permutation \( \sigma \) in \( A_n \) does not split into two \( A_n \) classes`,
      r`there exists an odd permutation which commutes to \( \sigma \).`
    ),
    r`Show that the following conditions are equivalent:`
    + createList("a",
      r`the \( S_n \)-class of a permutation \( \sigma \) in \( A_n \) splits into two \( A_n \)-classes`,
      r`the cycle decomposition of \( \sigma \) is a product of cycles of pairwise distinct odd lengths`
      ),
  ), // end of assignment 3
  r`Let \( G \) be a group of even order. Show from first principles that \( G \) contains an element of order 2.`,
  r`Let \( G \) be a group. `
  + r`Describe the centralizer and the normalizer in \( \Sym(G) \) of the image of \( G \) under the left regular action \( G \to \Sym(G) \).`,
  r`Let \( G \) be a group of order \( 2p \) where \( p \) is an odd number. `
  + r`Let \( G \to \Sym(G) \) be the Cayley action. Show that the image of \( G \) in \( \Sym(G) \) contains an odd permutation. `
  + r`Deduce that \( G \) contains a normal subgroup of index 2.`,
  r`Let \( G \) be a semigroup, \( S \subseteq G \) be a set, and let \( S' \) denote the commutant (or centralizer) of \( S \) in \( G \). `
  + r`Show that \( S' \) is a semigroup. Show that \( S''' = S' \).`,
  r`Draw a Cayley graph of \( A_4 \) in which one can see the Klein group \( V \lhd S_4 \) and its 3 cosets.`, // end of assignment 4
  r`Let \( S_4 \) denote the symmetric group on 4 elements.`
  + createList(1,
    r`Show that the Klein group \( V \) is a normal subgroup of \( S_4 \).`,
    r`Deduce that there exists a surjective homomorphism \( f : S_4 \surject S_3 \).`,
    r`Find \( \ker f \).`
  ),
  r`Let \( K, H \) be groups.`
  + createList(1,
    r`Show that \( K \rtimes H \) is a group.`,
    r`Show that the inclusions \( i : K \inject K \rtimes H \) and \( j : H \inject K \rtimes H \) are group homomorphisms.`
  ),
  r`Let \( p, q \) be integers.`
  + createList(1,
    r`Find a short exact sequence \[ \Z / p\Z \inject \Z / pq \Z \surject \Z / q\Z. \]`,
    r`Show that the sequence splits if and only if \( p, q \) are coprime.`
  ),
  r`Let \( n \geq 3 \). Show that the dihedral group \( D_n \), and the symmetric group \( S_n \), are non trivial semidirect products.`,
  r`Let \( A, B \) be normal subgroups generating a group \( G \), i.e., \( G = \langle A, B \rangle \).`
  + r` Show that \( G / (A \cap B) \isom G / A \times G / B \).`, // end of assignment 5
  r`Is \( Q_8 \), the group of quaternions, a nontrivial semidirect product?`,
  r`Show that the dihedral group \( D_n \) is nilpotent if and only if \( n \) is a power of 2.`,
  r`Let \( G \) be a finite group. Suppose that there exists \( \sigma \in \Aut(G) \) such that \( \sigma^2 = \mathrm{Id} \) and \( \sigma(s) \neq s \) `
  + r`for every \( s \in G \) distinct from \( e \). Show that \( G \) is abelian.`,
  r`Given a finite group \( G \), the Frattini subgroup \( \Phi \) of \( G \) is defined to be the intersection of all maximal subgroups of \( G \).`
  + createList(1,
    r`Show that \( \Phi \) is normal in \( G \).`,
    r`Show that if \( H < G \) , then \( \Phi H < G \).`,
    r`Let \( H \) be a Sylow subgroup of \( \Phi \). Show that \( \Phi N_G(H) = G \).`,
    r`Deduce from (2) and (3) that \( \Phi \) is nilpotent.`
  ),
  r`Let \( f \) be an automorphism of the symmetric group \( S_n \). If \( f \) is inner then it preserves the \( k \)-cycles, for every \( k \geq 2 \), `
  + r`by the usual conjugacy formula. The exercise is to prove that the converse is true; more generally, prove that if \( f \) takes the transpositions to `
  + r`transpositions, then \( f \) is inner.`, // end of assignment 6
  r`Let \( p \) be a prime number, and \( G \) be a finite group acting faithfully and transitively on a set \( X \) with \( p \) elements. `
  + r`Show that every nontrivial normal subgroup of \( G \) acts transitively on \( X \).`,
  r`Let \( p \) be a prime number.`
  + createList(1,
    r`How many Sylow \( p \)-subgroups are there in \( S_p \)?`,
    r`Deduce that \( (p-1)! \equiv -1 \mod p \).`
  ),
  r`Work out \( \operatorname{Sylow}(35) \).`,
  createList(1,
    r`Show that every maximal subgroup of a finite abelian group is of prime index.`,
    r`Show the same thing for finite nilpotent groups.`
  ),
  r`Let \( G \) be a simple group of order 168. How many elements of order \( 7 \) are there in \( G \)?` // end of assignment 7
]

let completion = questions.map(_ => false);

// Add KaTeX.js rendering to the whole document
document.addEventListener("DOMContentLoaded", () => {
  renderMath()
  // show page once KaTeX finishes loading
  setTimeout(() => document.getElementsByTagName("html")[0].style.visibility = "visible", 30); 
});

window.onload = () => {
  let questionP = document.querySelector("#question-p");
  let completionP = document.querySelector("#completion-p");
  let nextButton = document.querySelector("#next-button");
  let showAllButton = document.querySelector("#show-all-button");
  let resetButton = document.querySelector("#reset-button");

  updateCompletion(completion, completionP);
  pick(questions, completion, questionP);

  nextButton.onclick = () => {
    updateCompletion(completion, completionP);
    pick(questions, completion, questionP);
  };

  showAllButton.onclick = () => showAll(questions, questionP);

  resetButton.onclick = () => {
    completion = questions.map(_ => false)
    updateCompletion(completion, completionP);
    pick(questions, completion, questionP);
  };
}
