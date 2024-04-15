<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <!-- Separate the title into its words, add a line break every three words -->
  <h1 class="flex flex-wrap justify-center font-quatro">
    <template v-for="(word, index) in props.title.split(' ')" :key="index">
      <span class="mr-2">
        {{ word }}
      </span>
      <span class="w-full" v-if="(Number(index) + 1) % 3 === 0"></span>
    </template>
  </h1>
</template>


<style scoped lang="scss">
h1 {
  letter-spacing: 0.5px;
  text-shadow: 0 9px 10px rgba(0, 0, 0, 0.5);
}

/* Inserting a collapsed row between two flex items will make
 * the flex item that comes after it break to a new row */
.break {
  flex-basis: 100%;
  height: 0;
}

h1 span {
  align-self: end;
  line-height: 1em;
}

// Apply font weight light to the first and last word
h1 span:first-child,
h1 span:last-child {
  font-weight: 300;
}

// Increase the font size of the third and fourth word (The fourth span is the line break)
h1 span:nth-child(3),
h1 span:nth-child(5) {
  font-size: 1.2em;
}

@media (min-width: 600px) {
  // Increase the font size of the third and fourth word (The fourth span is the line break)
  h1 span:nth-child(3),
  h1 span:nth-child(5) {
    font-size: 1.6em;
  }
}

// Starting from the fourth word align the words to the top
h1 span:nth-child(n + 5) {
  align-self: start;
}

// Animate all the words separately
body.loaded h1 span {
  display: inline-flex;
  opacity: 0;
}

body.loaded {
  h1 span {
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
  }

  // Delay the animation of the first two words
  h1 span:nth-child(1) {
    animation-delay: 0.3s;
  }

  h1 span:nth-child(2) {
    animation-delay: 0.7s;
  }

  // Apply the animation to the odd words
  h1 span:nth-child(odd) {
    animation-name: fade-in-up;
  }

  // Apply the animation to the even words
  h1 span:nth-child(even) {
    animation-name: fade-in-down;
  }
}

// Animate the words
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

// Animate the words
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
