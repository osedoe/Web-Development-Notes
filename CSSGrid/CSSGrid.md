# CSS Grid

This is a short introduction into the CSS Grid properties.

They're not all covered, but feel free to add anything.

## Introduction

We want to **display: grid** in every parent we want to use the css grid.
Then, use the **grid-template-\*** to specify the layout -common way-.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 100% 50px;
}
```

To specify the gap between the different columns and rows, we'll use **grid-\*-gap**, or the **grid-gap** shorthand.

```css
.container {
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  grid-gap: 20px 30px;
}
```

Now, there's another way to define the layout, using the columns instead of the lines that limit these.

```css
// Using columns instead of lines
.container {
  grid-column: 1 / 2;
  grid-row: 2/3;
}
```

- The images defines the lines, and the squares built on this are the columns and rows.

![Lines in CSSGrid](/img/grid-names.png)

---

## Align children element individually

Selecting the children element:

```css
.children {
  // Align an Item Horizontally using justify-self
  justify-self: [ start | center | end | stretch ];

  // Align an Item Vertically using align-self
  align-self: [ start | center | end | stretch ];
}
```

---

## Align all children elements

Selecting the parent element:

```css
.container {
  // Align All Items Horizontally using justify-items
  justify-items: [ start | center | end | stretch ];

  // Align All Items Vertically using align-items
  align-items: [ start | center | end | stretch ];
}
```

---

## Grid Areas

We can assign names to the different parts of a layout, dividing it into an **"Area-Template"**:

```css
.container {
  grid-template-areas:
    "header header header"
    "advert content content"
    "footer footer footer";
}
```

For later on, assigning it to the children items.

```css
.children1 {
  // Placing items into grid areas with grid-area
  grid-area: header;
}
```

We can use the grid-area without creating an area-template, with the **grid-area** property, with the values **[ a / b / c / d ]**, where:

<ol type="a">
  <li>Horizonal line to start at</li>
  <li>Vertical line to start at</li>
  <li>Horizontal line to end at</li>
  <li>Vertical line to end at</li>
</ol>

```css
.children1 {
  grid-area: [a/b/c/d];
  grid-area: 1/1/2/4;
}
```

---

## Built-in functions

### Min-Max Function

Used to limit the size of items when the grid container changes size. We need to specify the acceptable size range for the item.

```css
.container {
  grid-template-columns: 100px minmax(50px, 200px);
}
```

_First parameter will be the minimum, and the second the maximum._

---

### Repeat Function

Specifies the number of times you want your column or row to be repeated, followed by a comma and the value you want to repeat.

```css
// Reduce repetition using the repeat function
.container {
  // To create a 100 rop grid, each row at 50px tall.
  grid-template-rows: repeat(100, 50px);
}

.container2 {
  grid-template-columns: repeat(2, 1fr 50px) 20px;
  // Translates into
  grid-template-columns: 1fr 50px 1fr 50px 20px;
}
```

### Auto-fill

The parameter [*auto-fill*] in the **repeat()** function allows us to automatically insert as many rows or columns with the desired size as possible, depending on the size of the container.

_Note: Mixing **auto-fill** with **minmax** will allow us to create flexible layouts_.

```css
.container {
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
```

### Auto-fit

Similar to **auto-fill.  
The difference is that when the container's size exceeds the size of all the items comined, **auto-fill** keeps inserting empty rows or columns and pushes your items to the side, while **auto-fit\*\* collapses those empty rows or columns and stretches your items to fit the size of the container.

![Autofill vs autofit](/img/autofill-autofit.png)

_Note:  
The first row will apply to **auto-fill**.  
The second one to **auto-fit**._

## Media Queries implementation on CSS Grid

We can achieve RWD by mixing CSS Grid and Media-Queries.

Going from this:

![Media-Queries in action 1](/img/mediaqueries1.png)

Medium size:

![Media-Queries 2](/img/mediaqueries2.png)

To this, in small devices:

![Media-Queries 3](/img/mediaqueries3.png)

We'll do it designing with the mobile-first approach in mind, as usual.
If we define the **grid-template-areas** first from top-bottom, it will be easier doing the rest.

Assuming each children has it's own **grid-area: [name]**  
-header, advert, content and footer-.

```css
.container {
  font-size: 1.5em;
  min-height: 300px;
  width: 100%;
  background: LightGray;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px auto 1fr auto;
  grid-gap: 10px;
  grid-template-areas:
    "header"
    "advert"
    "content"
    "footer";
}

@media (min-width: 300px) {
  .container {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "advert header"
      "advert content"
      "advert footer";
  }
}

@media (min-width: 400px) {
  .container {
    grid-template-areas:
      "header header"
      "advert content"
      "footer footer";
  }
}
```

## Grid within grid

If we set a **display: grid** and a **grid-template-[columns/rows]** in a children, we can nest grid inside other grids already defined.
