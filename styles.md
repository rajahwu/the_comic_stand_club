# Styles

## Character Feed /

### SearchBar

```js
  const btnStyles = {
    borderRadius: "7px",
    height: "1.8rem",
    width: "5rem",
    margin: 0,
    color: "#d2b811",
    backgroundColor: " hsl(240, 5%, 4%)",
    cursor: "pointer",
    opacity: 0.8
  };
```

## Feed Buttons /

```js

  const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "#d2b811",
    backgroundColor: " hsl(240, 5%, 4%)",
    cursor: "pointer",
    opacity: 0.8,
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = "#f2eadf";
    e.target.style["box-shadow"] = "2px 2px 2px hsl(120, 64%, 17%)";
    e.target.style["height"] = "2.7rem";
    e.target.style["width"] = "5.3rem";
    e.target.style["opacity"] = 1;
  };
  const handleMouseLeave = (e) => {
    e.target.style.color = "#d2b811";
    e.target.style.border = "1px solid #fee52e";
    e.target.style["box-shadow"] = "";
    e.target.style["height"] = "2.5rem";
    e.target.style["width"] = "5rem";
    e.target.style["opacity"] = 0.8;
  };
```

## ClubForm /

```js
  const btnStyles = {
    borderRadius: "3px",
    height: "2rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  };

  const inputStyles = {
    backgroundColor: "#d9b811",
    height: "1.3rem",
  };
```

## StandForm /

```js
const btnStyles = {
    borderRadius: "3px",
    height: "2rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  };
```

## Navigation

### ProfileButton

```js
const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  }
```

## OpenModalButton

```js
 const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  }
```

## ContentPage

```js
  const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "#d2b811",
    backgroundColor: " hsl(240, 5%, 4%)",
    cursor: "pointer",
    opacity: 0.8,
  };
```

## SplashPage

```js
 const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  };

```