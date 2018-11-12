# Kiri:Moto todo

* widget general add-ons (fdm supports, cam tabs)
* extend mesh object to store raw + annotations (rot,scale,pos), share raw data w/ dups, encode/decode
* bail on decimation if it's proving ineffective
* improve decimation speed by avoiding in/out of Point
* dismissible transient message/alert
* modal non-alert-based dialog & spinner
* server-side processing (determine protocol and storage)
* move more kiri code (like printing) into modules like serial
* refactor / simplify POLY.expand (put onus on collector)
* add simple solid (tube-like) rendering in place of lines
* cloned objects should share same slice data unless rotated
* remember object's original position/orientation for reset/multi-object import alignment

# References

* other
  -----
* http://lcamtuf.coredump.cx/gcnc/full/
* http://wiki.imal.org/howto/cnc-milling-introduction-cutting-tools
* http://www.twak.co.uk/2011/01/degeneracy-in-weighted-straight.html


# Sample FDM Pause/Unpause ```

G91        ; Relative Positioning
G0 Z20     ; Move Bed down 20mm
G90        ; Absolute positioning
G0 X10 Y10 ; Move to 10,10
M2000      ; Raise3D N2 Pause command
G91        ; Relative Positioning
G0 Z-20    ; Move Bed up 20mm
G90        ; Absolute positioning

```
