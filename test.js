const obj = {
  name: "ddd",
};
function p(user) {
  const newu = JSON.parse(user);
  console.log(newu);
}

p(`${JSON.stringify(obj)}`);
