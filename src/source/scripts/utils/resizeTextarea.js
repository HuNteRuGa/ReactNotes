export default textarea => {
  textarea.style.height = "auto";
  let h = textarea.scrollHeight - 25;
  if (h > 180) h = 180;
  textarea.style.height = `${h}px`;
};
