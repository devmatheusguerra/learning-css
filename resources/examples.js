const e01 = `
@keyframes move{

    0%{

        transform: translateY(-1%);
    }

    25%{

        transform: translateY(0%);
    }

    50%{

        transform: translateY(1%);
    }
    
    75%{

        transform: translateY(0%);
    }

    100%{

        transform: translateY(-1%);
    }

}


.shirt, .body, .pants, .boots, .eyes, .hair, .mouth, .pupils, .nose, .sclera {
    animation: move 1s linear infinite !important;
}
`;



const e02 = `


.shirt{

    fill: #ff0000 !important;

}


.body{

    fill: #0000ff !important;

}


.pants{

    fill: #00ff00 !important;

}

`;
