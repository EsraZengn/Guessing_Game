<template>
  <img
    class="ad-img"
    src="~/assets/images/header_banner.png"
    alt="Image not found"
  />
</template>

<style scoped>
.ad-img {
  height: 50px;
  width: 100%;
  object-fit: cover;
}

@media (min-width: 1025px) {
  .ad-img {
    height: 90px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .ad-img {
    height: 80px;
  }
}
</style>