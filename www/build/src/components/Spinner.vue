<template>
  <div class="spinner">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.spinner{
  width: 60px;
  height: 60px;
  background-color: rgba(255,255,255,.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

$loader-color:              #735DEE !default;
$loader-size:                  30px !default;
$loader-height:                20px !default;
$loader-border-size:            4px !default;
$loader-gap:                   12px !default;
$loader-animation-duration:      .6s !default;

@mixin loader-scale {
  @keyframes loader-scale {
    0% {
      transform: scale(0);
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
@mixin loader06(
  $size: $loader-size,
  $color: $loader-color,
  $border-size: $loader-border-size,
  $duration: $loader-animation-duration,
  $align: null
) {
  width: $size;
  height: $size;
  border: $border-size solid transparent;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    border: $border-size solid rgba($color, 0.5);
    border-radius: 50%;
    width: $size * 1.2;
    height: $size * 1.2;
    position: absolute;
    top: -(($size * 1.2) / 2) + ($size / 2) - $border-size;
    left: -(($size * 1.2) / 2) + ($size / 2) - $border-size;
    animation: loader-scale $duration ease-out infinite;
    animation-delay: $duration;
    opacity: 0;
  }

  &::after {
    content: '';
    border: $border-size solid $color;
    border-radius: 50%;
    width: $size;
    height: $size;
    position: absolute;
    top: -$border-size;
    left: -$border-size;
    animation: loader-scale $duration ease-out infinite;
    animation-delay: $duration / 2;
  }

  @if ($align == center) {
    margin: 0 auto;
  }
  @if ($align == middle) {
    top: 50%;
    margin: -$size / 2 auto 0;
  }
  @include loader-scale;
}
.loader{
  @include loader06;
}
</style>
