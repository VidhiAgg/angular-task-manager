import { trigger, transition, query, style, group, animate } from "@angular/animations";
//import this in app.ts file
export const fadeAnimation =
//with ths animation name we will apply animation to container-fluid which the router-outlet is present
/*
1.transition("/signup => /login")
2. "* <=> *" =>indicates the same animation should be exeuted on any state change
3.entry represents -> new page where user wants to go
4. leave represents -> the exsisting page
5. apply css prop. to bith these elements
6. {optional: true} -> skip applying css prop when router-outlet is not activated
        */
trigger("routeAnimations",[ 
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({opacity : 0}),
                    animate("0.4s", style({opacity: '1'}))
                ],{optional: true}),
                query(":leave",[
                    style({opacity : 1}),
                    animate("0.2s", style({opacity: '0'}))
            ],{optional: true}
            )
        ])
    ])
]);
export const slideUpAnimation =
    trigger("slideAnimations",[ 
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({transform: "translateY(100%)"}),
                    animate("0.6s", style({transform: "translateY(0%)"}))
                ],{optional: true}),
                query(":leave",[
                    style({transform: "translateY(0%)"}),
                    animate("0.6s", style({transform: "translateY(-100%)"}))
            ],{optional: true}
            )
        ])
    ])
]);

export const zoomUpAnimation = 
trigger("zoomUpAnimate",[
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({transform: "scale(0) translateY(100%)"}),
                    animate("0.6s", style({transform: "scale(1) translateY(0%)"}))
                ],{optional: true}),
                query(":leave",[
                    style({transform: "scale(1) translateY(0%)"}),
                    animate("0.2s", style({transform: "scale(0) translateY(-100%)"}))
            ],{optional: true}
            )
        ])
    ])
]);

export const zoomLeftAnimation= 
trigger("zoomLeftAnimate",[
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({transform: "scale(0) translateX(100%)"}),
                    animate("0.6s", style({transform: "scale(1) translateX(0%)"}))
                ],{optional: true}),
                query(":leave",[
                    style({transform: "scale(1) translateX(0%)"}),
                    animate("0.0s", style({transform: "scale(0) translateX(-100%)"}))
            ],{optional: true}
            )
        ])
    ])
]);

function slideLeft(){
    return[
        query(":enter, :leave",
        style({position : 'absolute', width: '98%'}),
        {optional: true}),
        group([
            query(":enter",[
                style({transform: "translateX(100%)"}),
                animate("0.6s", style({transform: "translateX(0%)"}))
            ],{optional: true}),
       
            query(":leave",[
                style({transform: " translateX(0%)"}),
                animate("0.6s", style({transform: "translateX(-100%)"}))
        ],{optional: true})
    ])
    ];

}

function slideRight(){
    return [
        query(":enter, :leave",
        style({position : 'absolute', width: '98%'}),
        {optional: true}),
        group([
            query(":enter",[
                //move elements from rt to noraml postion
                style({transform: "translateX(-100%)"}),
                animate("0.6s", style({transform: "translateX(0%)"}))
            ],{optional: true}),
            query(":leave",[
                //move elements from normal position to screen right
                style({transform: "translateX(0%)"}),
                animate("0.6s", style({transform: " translateX(100%)"}))
            ],{optional: true})
        ])
    ];

}
export const slideLeftOrRightAnimation= trigger("slideLeftOrRightAnimate",[
    transition("0 => *", slideLeft()),
   

    transition("1 => 0", slideRight()),
    transition("1 => *", slideLeft()),
    
    transition("2 => 0", slideRight()),
    transition("2 => 1", slideRight()),
    transition("2 => 3", slideLeft()),
    transition("2 => 4", slideRight()),
    transition("2 => 5", slideLeft()),
    transition("2 => 6", slideLeft()),

    transition("3 => 0", slideRight()),
    transition("3 => 1", slideRight()),
    transition("3 => 2", slideRight()),
    transition("3 => 4", slideLeft()),
    transition("3 => 5", slideLeft()),
    transition("3 => 6", slideLeft()),

    transition("4 => 0", slideRight()),
    transition("4 => 1", slideRight()),
    transition("4 => 2", slideLeft()),
    transition("4 => 3", slideRight()),
    transition("4 => 5", slideLeft()),
    transition("4 => 6", slideLeft()),

    transition("5 => 0", slideRight()),
    transition("5 => 1", slideRight()),
    transition("5 => 2", slideRight()),
    transition("5 => 4", slideRight()),
    transition("5 => 3", slideRight()),
    transition("5 => 6", slideLeft()),

    transition("6 => *", slideRight()),
]);


