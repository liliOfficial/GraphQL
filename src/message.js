const message = 'This is Graphql';
const name = 'lily';
const getGreeting = name => {
  return `Welcome to the course ${name}`;
};

export { message as default, name, getGreeting };
