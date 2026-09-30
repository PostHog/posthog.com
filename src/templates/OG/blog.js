module.exports = blog = ({ image }) => `<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      overflow: hidden;
    }
  </style>
</head>

<body>
  <section>
    <img
      style="
        object-fit: cover;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      "
      src="${image}"
    />
  </section>
</body>
</html>
`
