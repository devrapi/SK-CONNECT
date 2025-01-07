<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
   <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Sk Connect</title>

    <link rel="icon" type="image/png" href="/img/sk.png">

</head>
<body>
    <div id="root"></div>
    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <script>
        window.env = {
            API_BASE_URL: "{{ env('API_BASE_URL') }}"
        }
    </script>



</body>
</html>
