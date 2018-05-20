<template>
  <svg :width='width' :height='height' :viewBox="isVertical ? '0,0,215,175':'0,0,450,115'">
    <g>
      <rect x='55' y='5' width='100' height='100' fill='#138971'></rect>
      <rect x='60' y='10' width='90' height='90' fill='#22baa0'></rect>
      <rect x='75' y='25' width='60' height='60' fill='#138971'></rect>
      <text x='90' y='70' fill='white' stroke='white' style='font: 45px Righteous'>S</text>
    </g>
    <text v-if='isVertical' x='5' y='160' fill='#138971' stroke='#138971' style='font: 45px Roboto'>SafetyCTF</text>
    <text v-else x='175' y='75' fill='#138971' stroke='#138971' style='font: 60px Roboto'>SafetyCTF</text>
  </svg>
</template>

<script>
export default {
  name: 'Logo',
  props: ['width', 'height', 'isVertical']
}
</script>
