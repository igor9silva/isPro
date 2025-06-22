import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h2>hello world</h2>
      <p>this is a test</p>
      <p>this is another test</p>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <a href="https://www.google.com">google</a>
      <button>click me</button>
      <ol>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ol>
    </>
  );
}
