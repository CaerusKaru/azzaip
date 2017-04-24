# nav-menu

#### Description

A tree-like accordion navigation menu, best suited for sidenav navigation. Adapted by original AngularJS implementation
for https://material.angularjs.org (open source).

#### Structure

`<nav-menu-container>` - the top-level structure for any nav-menu elements

`<nav-menu-header>` - a header for a group of nav-menu elements

`<nav-menu-toggle>` - a collapsible accordion containing a list of links

`<nav-menu-link>` - a clickable link that can be anywhere in a nav-menu

#### Example

```$xslt
<nav-menu-container>
  <nav-menu-header label="Header 1">
    <nav-menu-toggle label="Toggle 1">
      <nav-menu-link link="/link1">Link 1</nav-menu-link>
      <nav-menu-link link="/link2">Link 2</nav-menu-link>
    </nav-menu-toggle>
    <nav-menu-link link="/link3">Link 3</nav-menu-link>
  </nav-menu-header>
  <nav-menu-toggle label="Toggle 2">
    <nav-menu-link link="/link4">Link 4</nav-menu-link>
    <nav-menu-link link="/link5">Link 5</nav-menu-link>
  </nav-menu-toggle>
  <nav-menu-link link="/link6">Link 6</nav-menu-link>
</nav-menu-container
```

#### Attributes

`label` - Used for naming purposes for embedded objects `nav-menu-header` and `nav-menu-toggle`

`link` - Used for navigation purposes for `nav-menu-link`. Uses the Angular Router to directly navigate to route
