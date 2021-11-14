const Encodemail = (mail) => {
  const arr1 = mail.split("@");
  const arr2 = arr1[1].split(".");
  const finalMail = arr1[0] + arr2[0] + arr2[1];
  return finalMail;
};

export default Encodemail;
