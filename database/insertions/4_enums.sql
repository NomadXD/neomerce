insert into citytype values ('main', 'Main City', 5, 500);
insert into citytype values ('secondary', 'Secondary City', 7, 1000);

insert into accounttype values ('guest', 'Guest User');
insert into accounttype values ('user', 'Normal User');
insert into accounttype values ('admin', 'Administrator');

insert into cartitemstatus values ('added', 'Added to cart');
insert into cartitemstatus values ('removed', 'Removed from cart');
insert into cartitemstatus values ('ordered', 'Added to a order');
insert into cartitemstatus values ('merged', 'Cart items merged into a bigger cart item set');
insert into cartitemstatus values ('transferred', 'Cart items transferred from a guest account');

insert into orderstatus values ('ordered', 'Ordered');
insert into orderstatus values ('completed', 'Order completed');

insert into dispatchmethod values ('store_pickup', 'Pick up from the store');
insert into dispatchmethod values ('home_delivery', 'Deliver to the home');

insert into deliverystatus values ('ongoing', 'Delivery Ongoing');
insert into deliverystatus values ('delivered', 'Delivery Completed');
insert into deliverystatus values ('pending pick up','Pending user pick up');
insert into deliverystatus values ('picked up','User picked up');

insert into paymentmethod values ('card', 'Card payment');
insert into paymentmethod values ('cash', 'Cash on delivery');

insert into paymentstatus values ('payed', 'Payment done');
insert into paymentstatus values ('not_payed', 'Payment not completed');

insert into pickupstatus values ('pending pick up', 'The user has not picked up the order yet');
insert into pickupstatus values ('picked up', 'The user has picked up the order');