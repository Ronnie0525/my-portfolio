/* =============================================================
   LANYARD ID — V-shape verlet rope physics + draggable card
   Drives the hero ID card: rope hangs in a V, card drops in,
   and the card is draggable with spring-back physics.
   (Ported from Ronnie's previous portfolio.)
   ============================================================= */
(function () {
  var stage = document.getElementById('lanyardStage');
  if (!stage) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var pin = document.getElementById('lanyardPin');
  var card = document.getElementById('lanyardCard');
  var dropEl = document.getElementById('lanyardDrop');

  var ropeLeftEl = document.getElementById('ropeStrandL');
  var edgeLeftEl = document.getElementById('ropeEdgeL');
  var ropeRightEl = document.getElementById('ropeStrandR');
  var edgeRightEl = document.getElementById('ropeEdgeR');

  // Verlet parameters
  var N = 12;             // points per strand
  var GRAVITY = 0.42;
  var DAMPING = 0.992;
  var ITERATIONS = 32;
  var idleAmp = 0.12;

  var leftChain = [];
  var rightChain = [];
  var leftSegLen = 26, rightSegLen = 26;
  var dragging = false;
  var dragEnabled = false; // becomes true after the drop animation lands
  var grabDX = 0, grabDY = 0;
  var stageRect = null;
  // Smoothed rotation values — low-pass-filtered so the card doesn't jerk on fast direction changes
  var smoothAngleDeg = 0;
  var smoothTiltY = 0;

  function recalcStage() {
    stageRect = stage.getBoundingClientRect();
  }

  function setup() {
    recalcStage();
    var W = stage.clientWidth;
    var H = stage.clientHeight;

    // Two anchor points spread apart at the top — creates the V shape.
    var leftAnchorX = W * 0.34;
    var rightAnchorX = W * 0.76;
    var anchorY = -360;

    // Shared tip — sits below, ~middle horizontally, vertically centered with the card
    var tipX = (leftAnchorX + rightAnchorX) / 2;
    var tipY = Math.max(60, Math.min(220, H / 2 - 230));

    var leftLen = Math.sqrt((tipX - leftAnchorX) * (tipX - leftAnchorX) + (tipY - anchorY) * (tipY - anchorY));
    var rightLen = Math.sqrt((tipX - rightAnchorX) * (tipX - rightAnchorX) + (tipY - anchorY) * (tipY - anchorY));
    leftSegLen = leftLen / (N - 1);
    rightSegLen = rightLen / (N - 1);

    var tipPt = { x: tipX, y: tipY, ox: tipX, oy: tipY, pinned: false };

    leftChain.length = 0;
    for (var i = 0; i < N; i++) {
      if (i === N - 1) { leftChain.push(tipPt); continue; }
      var t = i / (N - 1);
      var x = leftAnchorX + (tipX - leftAnchorX) * t;
      var y = anchorY + (tipY - anchorY) * t;
      leftChain.push({ x: x, y: y, ox: x, oy: y, pinned: i === 0 });
    }
    rightChain.length = 0;
    for (var j = 0; j < N; j++) {
      if (j === N - 1) { rightChain.push(tipPt); continue; }
      var t2 = j / (N - 1);
      var x2 = rightAnchorX + (tipX - rightAnchorX) * t2;
      var y2 = anchorY + (tipY - anchorY) * t2;
      rightChain.push({ x: x2, y: y2, ox: x2, oy: y2, pinned: j === 0 });
    }
  }
  setup();

  function tipPoint() { return leftChain[N - 1]; } // shared with rightChain[N-1]

  function getStageCoords(clientX, clientY) {
    return { x: clientX - stageRect.left, y: clientY - stageRect.top };
  }

  function onPointerDown(e) {
    if (!dragEnabled) return;
    e.preventDefault();
    recalcStage();
    var pt = (e.touches && e.touches[0]) || e;
    var local = getStageCoords(pt.clientX, pt.clientY);
    var tip = tipPoint();
    grabDX = local.x - tip.x;
    grabDY = local.y - tip.y;
    dragging = true;
    card.classList.add('is-dragging');
    var hint = document.getElementById('lanyardHint');
    if (hint) hint.classList.add('has-dragged');
  }
  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    var pt = (e.touches && e.touches[0]) || e;
    var local = getStageCoords(pt.clientX, pt.clientY);
    var tip = tipPoint();
    tip.ox = tip.x;
    tip.oy = tip.y;
    tip.x = local.x - grabDX;
    tip.y = local.y - grabDY;
  }
  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    card.classList.remove('is-dragging');
    // Cap release velocity so a fast flick doesn't catapult the chain into instability.
    var tip = tipPoint();
    var vx = tip.x - tip.ox;
    var vy = tip.y - tip.oy;
    var v = Math.sqrt(vx * vx + vy * vy);
    var MAX_RELEASE_V = 14;
    if (v > MAX_RELEASE_V) {
      var s = MAX_RELEASE_V / v;
      tip.ox = tip.x - vx * s;
      tip.oy = tip.y - vy * s;
    }
  }

  card.addEventListener('mousedown', onPointerDown);
  card.addEventListener('touchstart', onPointerDown, { passive: false });
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
  window.addEventListener('touchcancel', onPointerUp);

  window.addEventListener('resize', setup);
  window.addEventListener('scroll', recalcStage, { passive: true });

  // After the CSS drop animation lands, enable dragging and inject a settle swing.
  if (dropEl) {
    dropEl.addEventListener('animationend', function (e) {
      if (e.animationName !== 'lanyardDrop') return;
      dragEnabled = true;
      var tip = tipPoint();
      tip.ox = tip.x - 26; // ~26px/frame rightward swing
      tip.oy = tip.y - 14; // ~14px/frame residual downward fall
      var hint = document.getElementById('lanyardHint');
      if (hint) {
        setTimeout(function () { hint.classList.add('is-visible'); }, 350);
      }
    });
  }

  function integratePoint(p, isLockedTip) {
    if (p.pinned || isLockedTip) return;
    var vx = (p.x - p.ox) * DAMPING;
    var vy = (p.y - p.oy) * DAMPING;
    p.ox = p.x;
    p.oy = p.y;
    p.x += vx;
    p.y += vy + GRAVITY;
  }

  function solveConstraint(a, b, segLen, bLock) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
    var diff = (dist - segLen) / dist;
    var mx = dx * 0.5 * diff;
    var my = dy * 0.5 * diff;
    var aLock = a.pinned;
    if (aLock && bLock) return;
    if (aLock) { b.x -= mx * 2; b.y -= my * 2; }
    else if (bLock) { a.x += mx * 2; a.y += my * 2; }
    else { a.x += mx; a.y += my; b.x -= mx; b.y -= my; }
  }

  function step() {
    var tip = tipPoint();
    var tipVX = tip.x - tip.ox;

    for (var i = 1; i < N - 1; i++) integratePoint(leftChain[i], false);
    for (var k0 = 1; k0 < N - 1; k0++) integratePoint(rightChain[k0], false);
    integratePoint(tip, dragging);

    // Idle sway on the tip when not dragged
    if (!dragging && dragEnabled) {
      var t = performance.now();
      tip.x += Math.sin(t / 1300) * idleAmp;
    }

    // Constraints — solve both chains. The shared tip is locked while dragging.
    for (var iter = 0; iter < ITERATIONS; iter++) {
      for (var j = 0; j < N - 1; j++) {
        solveConstraint(leftChain[j], leftChain[j + 1], leftSegLen,
          leftChain[j + 1].pinned || (j + 1 === N - 1 && dragging));
      }
      for (var k = 0; k < N - 1; k++) {
        solveConstraint(rightChain[k], rightChain[k + 1], rightSegLen,
          rightChain[k + 1].pinned || (k + 1 === N - 1 && dragging));
      }
    }

    function buildPath(chain) {
      var d = 'M ' + chain[0].x.toFixed(1) + ' ' + chain[0].y.toFixed(1);
      for (var i = 1; i < N - 1; i++) {
        var midX = (chain[i].x + chain[i + 1].x) / 2;
        var midY = (chain[i].y + chain[i + 1].y) / 2;
        d += ' Q ' + chain[i].x.toFixed(1) + ' ' + chain[i].y.toFixed(1) + ' ' + midX.toFixed(1) + ' ' + midY.toFixed(1);
      }
      d += ' L ' + chain[N - 1].x.toFixed(1) + ' ' + chain[N - 1].y.toFixed(1);
      return d;
    }
    var dL = buildPath(leftChain);
    var dR = buildPath(rightChain);
    if (edgeLeftEl) edgeLeftEl.setAttribute('d', dL);
    ropeLeftEl.setAttribute('d', dL);
    if (edgeRightEl) edgeRightEl.setAttribute('d', dR);
    ropeRightEl.setAttribute('d', dR);

    var lPrev = leftChain[N - 2];
    var rPrev = rightChain[N - 2];
    var avgDX = (tip.x - lPrev.x) + (tip.x - rPrev.x);
    var avgDY = (tip.y - lPrev.y) + (tip.y - rPrev.y);
    var targetAngleDeg = Math.atan2(avgDX, Math.max(1, Math.abs(avgDY))) * 180 / Math.PI;
    targetAngleDeg = Math.max(-80, Math.min(80, targetAngleDeg));
    var targetTiltY = Math.max(-22, Math.min(22, -tipVX * 1.8));

    smoothAngleDeg += (targetAngleDeg - smoothAngleDeg) * 0.18;
    smoothTiltY += (targetTiltY - smoothTiltY) * 0.20;

    pin.style.transform =
      'translate3d(' + tip.x.toFixed(1) + 'px, ' + tip.y.toFixed(1) + 'px, 0) ' +
      'rotate(' + smoothAngleDeg.toFixed(2) + 'deg) ' +
      'rotateY(' + smoothTiltY.toFixed(2) + 'deg)';

    if (!pin.classList.contains('is-ready')) pin.classList.add('is-ready');

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();
