const Learning = () => {
  return (
    <div className="container lg:p-10 mx-auto lg:max-w-7xl">
      <h1 className="text-white lg:text-6xl underline underline-offset-1">
        React JS Learning
      </h1>
      <div className="w-4/5">
        <h1 className="text-white lg:text-2xl">What is ReactJS ?</h1>
        <p className="text-gray-400 leading-relaxed font-light text-lg">
          React is a declarative, efficient, and flexible JavaScript library for
          building user interfaces. It lets you compose complex UIs from small
          and isolated pieces of code called “components”. React has a few
          different kinds of components, but we’ll start with React.Component
          subclasses:
        </p>

        <div class="mockup-code p-4 w-5/6">
          <pre>
            <code>{`class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Learning;
