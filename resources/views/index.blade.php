<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Checkers</title>
</head>
<body>
    <div id="desk">
        @for ($j = 1; $j < 9; $j++)
            <div class="rows">
                @for ($i = 1; $i < 9; $i++)
                   @php
                       (($j+$i)%2 == 0) ? $color = "black" : $color = "white";
                   @endphp
                    <div onmouseover="mover({{ $j }},{{ $i }})" onmouseout="mout({{ $j }}, {{ $i }})" class="cage {{ $color }}" id="place-{{ $j . "-" .$i }}">
                        @if (($j < 4 || $j > 5) && $color == "black")
                            <div onclick="itemSelect({{ $j }},{{ $i }})" class="item">
                            </div>
                        @endif
                    </div>
                @endfor
            </div>
        @endfor
    </div>
    <script>
        var j, i;
        function itemSelect(j, i) {
            console.log("it works!", j, i);
            for (let r = 1; r < 9; r++) {
                for (let c = 1; c < 9; c++) {
                    if(document.getElementById("place-" + r + "-" + c).style.background === "rgb(22, 94, 78)"){
                        document.getElementById("place-" + r + "-" + c).style.background = "black"
                    }
                }
            }
            document.getElementById("place-"+ j + "-" + i).style.background = "rgb(22, 94, 78)"
        }

        function mover(j, i) {
            if ((j+i)%2===0 && document.getElementById("place-"+j+"-"+i).style.background !== "rgb(22, 94, 78)") {
            document.getElementById("place-"+j+"-"+i).style.background = "rgb(163, 30, 30)"
            }
        }
        function mout(j, i) {
            if ((j+i)%2===0 && document.getElementById("place-"+j+"-"+i).style.background !== "rgb(22, 94, 78)") {
                document.getElementById("place-"+j+"-"+i).style.background = "black"
            }
        }
    </script>
</body>
</html>