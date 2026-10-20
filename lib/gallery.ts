// Keep the journey photos in their original numbered order.
export const journeyMoments = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  return {
    id: `journey-photo-${number}`,
    image: `/assets/images/image${number}.${number >= 9 ? "jpg" : "jpeg"}`,
    title: `My journey — Photo ${number}`,
    caption: "Moments from my journey.",
    category: "My Journey",
  };
});
