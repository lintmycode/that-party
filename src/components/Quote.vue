<template>
  <section>
    <!-- Header: This is where you can briefly explain the plan for the day and your concept of the celebration. 
      Make it welcoming and personal. It's also a good place to clarify the informal dress code and mention 
      that it's a "bring your own" food and drink event. -->

    <h2>Vem Celebrar</h2>

    <blockquote>
      <p>Finalmente.</p>
      <cite>- toda a gente</cite>
    </blockquote>

    <ul>
      <li>Das 16h às 23h; a notária vem às 17h</li>
      <li>Vestuário informal; traz o que já tens</li>
      <li></li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 10rem 1rem;

  h2 {
    font-family: HiguenSerif;
    font-size: 10rem;
    line-height: 1.2;
    text-align: center;
  }

  blockquote {
    padding: 1rem 2rem;
    border-left: 8px solid var(--color-secondary);
    position: relative;
    //background: #f4f4f8; /* A light background color for contrast */
    max-width: 50rem;
    margin: 2rem auto;

    &:before {
      content: '“';
      position: absolute;
      top: 1rem;
      left: 2rem;
      font-size: 12rem;
      line-height: 12rem;
      color: var(--color-secondary);
    }

    p {
      font-size: 5rem;
      margin-left: 5rem;
      font-style: italic;
      font-family: 'Georgia', serif;
    }

    cite {
      display: block;
      text-align: right;
      margin-top: 1rem;
      font-weight: bold;
      color: var(--color-border);
    }
  }
}
</style>
