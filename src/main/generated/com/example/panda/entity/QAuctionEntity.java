package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAuctionEntity is a Querydsl query type for AuctionEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAuctionEntity extends EntityPathBase<AuctionEntity> {

    private static final long serialVersionUID = -976244928L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAuctionEntity auctionEntity = new QAuctionEntity("auctionEntity");

    public final DateTimePath<java.time.LocalDateTime> auction_date = createDateTime("auction_date", java.time.LocalDateTime.class);

    public final NumberPath<Integer> buy_now = createNumber("buy_now", Integer.class);

    public final NumberPath<Integer> highest_value = createNumber("highest_value", Integer.class);

    public final NumberPath<Integer> lowest_value = createNumber("lowest_value", Integer.class);

    public final QUserEntity userEntity;

    public final NumberPath<Integer> wid = createNumber("wid", Integer.class);

    public QAuctionEntity(String variable) {
        this(AuctionEntity.class, forVariable(variable), INITS);
    }

    public QAuctionEntity(Path<? extends AuctionEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAuctionEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAuctionEntity(PathMetadata metadata, PathInits inits) {
        this(AuctionEntity.class, metadata, inits);
    }

    public QAuctionEntity(Class<? extends AuctionEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
    }

}

