<script>
  class NullElementError extends Error {
    constructor(name, value, expectedKind = "defined") {
      super(
        `the value ${name} was expected to be ${expectedKind}, but it was ${value}`
      );
    }
  }
  let burgerActive = false;
  const toggleBurger = event =>
    burgerActive ? retractBurger(event) : expandBurger(event);
  const expandBurger = event => {
    const burgerElem = event.target;
    if (!burgerElem)
      throw new NullElementError("event.target", event.target, "an Element");
    const currentClass = burgerElem.getAttribute("class");
    burgerElem.setAttribute("class", currentClass + " is-active");
    burgerElem.setAttribute("aria-expanded", "true");
    burgerActive = true;
  };
  const retractBurger = event => {
    if (!event) throw new NullElementError("event", event, "an Event");
    const burgerElem = event.target;
    if (!burgerElem)
      throw new NullElementError("event.target", event.target, "an Element");
    const currentClass = burgerElem.getAttribute("class");
    burgerElem.setAttribute("class", currentClass.replace(" is-active", ""));
    burgerElem.setAttribute("aria-expanded", "false");
    burgerActive = false;
  };
</script>

<div
  role="button"
  class="navbar-burger"
  aria-label="menu"
  aria-expanded="false"
  on:click={toggleBurger}>
  <span aria-hidden="true" />
  <span aria-hidden="true" />
  <span aria-hidden="true" />
</div>
