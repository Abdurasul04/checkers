<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/onloadScript.js') }}" defer></script>
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
                    <div 
                    onmouseover="mover({{ $j }},{{ $i }})" 
                    onmouseout="mout({{ $j }}, {{ $i }})" 
                    class="cage {{ $color }}" id="place-{{ $j . "-" .$i }}"
                    onclick="itemSelect({{ $j }},{{ $i }})"
                    ondblclick="moveItem({{ $j }}, {{ $i }})">
                        @if (($j < 4 || $j > 5) && $color == "black")
                            <div class="item @if ($j < 4) enemy @else mine @endif" id="item-{{ $j . "-" .$i }}"></div>
                        @endif
                    </div>
                @endfor
            </div>
        @endfor
    </div>
    <div id="desk_score">
        <div id="score_enemy">0</div>
        <div id="score_mine">0</div>
    </div>
    <div id="menu">
        <div id="play_bot" onclick="step()">Play with bot</div>
    </div>
</body>
</html>