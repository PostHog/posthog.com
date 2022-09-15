module.exports = tutorials = ({ image }) => `<html>
<head>
  <meta charset="utf-8" />
</head>

<body>
  <section>
    <img  style="
    object-fit: cover;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #E5E7E0;" src="data:image/jpeg;charset=utf-8;base64,${image}" />
  </section>
</body>
</html>
`
