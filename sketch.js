//Reference: https://github.com/nature-of-code/noc-examples-processing/tree/master/chp08_fractals/NOC_8_08_SimpleLSystem

let chr = {
  character: "木", // wood
  strokes: [
    "M 524 533 Q 537 536 755 560 Q 768 557 779 573 Q 780 586 754 600 Q 709 627 634 603 Q 526 582 524 580 L 479 572 Q 404 563 234 546 Q 200 542 226 521 Q 265 491 291 494 Q 309 503 446 521 L 524 533 Z", //H
    "M 524 580 Q 524 682 544 758 Q 559 783 532 802 Q 516 814 485 833 Q 460 851 439 834 Q 433 828 440 813 Q 474 762 476 711 Q 477 647 479 572 L 477 458 Q 474 208 466 155 Q 442 46 456 5 Q 460 -7 466 -21 Q 473 -40 481 -43 Q 488 -50 495 -41 Q 504 -37 514 -15 Q 524 10 523 44 Q 522 90 523 480 L 524 580 Z", //V
    "M 446 521 Q 368 337 127 132 Q 114 119 124 117 Q 134 113 146 119 Q 276 176 403 344 Q 472 450 477 458 C 528 538 464 563 446 521 Z", // Pie
    "M 523 480 Q 607 338 716 186 Q 737 159 774 157 Q 901 147 942 150 Q 954 151 957 157 Q 957 164 941 173 Q 773 251 721 302 Q 628 398 523 532 Q 523 533 524 533 L 524 533 C 506 558 508 506 523 480 Z", //Na
  ],
};

let chr2 = {
  character: "花", // flower
  strokes: [
    "M 628 661 Q 842 661 852 668 Q 853 669 855 671 Q 861 683 844 697 Q 786 742 719 724 Q 686 718 647 711 L 588 701 Q 509 695 413 678 L 364 672 Q 270 663 169 651 Q 147 650 163 631 Q 178 616 196 611 Q 218 605 235 609 Q 299 627 372 637 L 416 643 Q 455 653 577 659 L 628 661 Z",
    "M 413 678 Q 409 718 408 750 Q 409 771 389 777 Q 344 795 325 789 Q 306 780 322 760 Q 353 720 364 672 L 372 637 Q 384 568 399 552 Q 412 542 417 553 Q 420 565 416 643 L 413 678 Z",
    "M 647 711 Q 657 741 679 781 Q 695 797 683 808 Q 670 826 633 844 Q 615 854 596 844 Q 586 837 594 825 Q 606 792 588 701 L 577 659 Q 550 554 550 544 Q 551 528 568 541 Q 587 557 628 661 L 647 711 Z",
    "M 323 338 Q 398 425 417 438 Q 427 448 425 461 Q 422 474 398 501 Q 374 523 356 525 Q 337 526 342 504 Q 351 474 337 453 Q 294 378 235 313 Q 178 249 103 181 Q 91 172 89 167 Q 83 157 98 157 Q 143 157 296 309 L 323 338 Z",
    "M 296 309 Q 326 243 290 83 Q 278 34 313 -7 L 314 -9 Q 330 -24 342 1 Q 355 40 355 83 Q 358 230 363 263 Q 370 288 361 298 Q 333 331 323 338 C 300 358 285 337 296 309 Z",
    "M 572 247 Q 728 350 819 396 Q 841 399 838 413 Q 834 432 814 458 Q 795 483 767 489 Q 749 490 747 468 Q 748 452 734 433 Q 670 372 575 293 L 527 255 Q 472 213 409 164 Q 402 157 406 147 Q 416 143 425 148 Q 477 185 527 217 L 572 247 Z",
    "M 939 93 Q 924 121 905 211 Q 905 229 897 234 Q 890 238 886 218 Q 856 122 836 93 Q 824 77 788 67 Q 704 46 630 76 Q 602 89 593 108 Q 572 151 572 247 L 575 293 Q 579 369 593 456 Q 599 477 585 487 Q 570 502 544 511 Q 531 515 521 510 Q 514 506 519 486 Q 535 443 532 401 Q 528 319 527 255 L 527 217 Q 528 126 540 86 Q 546 61 569 38 Q 654 -29 817 -2 Q 833 2 850 6 Q 892 19 932 48 Q 953 64 939 93 Z",
  ],
};

let theta;
let axiom = "F";
let sentence = axiom;
let len = 100;
let count = 0;
let rules = [];

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F-F+F]",
};

function setup() {
  createCanvas(500, 500);
  background(0);
  theta = PI / 6;
}

function mousePressed() {
  if (count < 4) {
    len *= 0.5;
    let next = "";
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);
      let found = false;
      for (let j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          found = true;
          next += rules[j].b;
          break;
        }
      }
      if (!found) {
        next += current;
      }
    }
    sentence = next;
    console.log(sentence);

    push();
    translate(width / 2, height);
    stroke(255, 100);
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);
      if (current == "F") {
        if (count == 3) {
          push();
          scale(0.01, -len * 0.0014);
          let ctx2 = drawingContext;
          ctx2.fillStyle = "red";
          ctx2.strokeStyle = "red";
          for (let j = 0; j < chr2.strokes.length; j++) {
            p = new Path2D(chr2.strokes[j]);
            ctx2.fill(p);
          }
          pop();
        } else {
          push();

          scale(0.02, -len * 0.002);
          let ctx = drawingContext;
          ctx.fillStyle = "white";
          ctx.strokeStyle = "white";
          for (let j = 0; j < chr.strokes.length; j++) {
            p = new Path2D(chr.strokes[j]);
            ctx.fill(p);
          }
          pop();
        }
        translate(0, -len);
      } else if (current == "+") {
        rotate(theta);
      } else if (current == "-") {
        rotate(-theta);
      } else if (current == "[") {
        push();
      } else if (current == "]") {
        pop();
      }
    }
    pop();
    count++;
  }
}

